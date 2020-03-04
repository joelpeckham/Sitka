let Terminal = require('xterm').Terminal;
let os = require('os');
let pty = require('node-pty');
let ShellData = require('./ShellData.js');
let TermData = require('./TermData.js');

module.exports = class CommandLine {
  constructor(domElement, xTermOptionObject) {
    this.term = new Terminal(xTermOptionObject);
    this.term.open(domElement);

    this.shell = pty.spawn('bash', [], {
      cols: this.term.cols, rows: this.term.rows,
      cwd: process.cwd() + "/Home",
      env: { HOME: process.cwd() + "/Home"}
    });
    this.shellData = new ShellData(this.shell);
    this.termData = new TermData(this.term);
    this.termData.blockData = true;

    this.color = {
      black:    '\u001b[30m',
      red:      '\u001b[31m',
      green:    '\u001b[32m',
      yellow:   '\u001b[33m',
      blue:     '\u001b[34m',
      magenta:  '\u001b[35m',
      cyan:     '\u001b[36m',
      white:    '\u001b[37m',
      reset:    '\u001b[0m'
    };
  }

  promptTerminal(prompt){
    this.term.writeln(prompt)
  }

  async writeInShell(str, expected, timeout = 0.5, trim = false){
    let lastCallback = this.shellData.callbackFunction;
    this.shell.write(str)
    let promised = await new Promise ((resolve, reject) => {
      this.shellData.on(data => {
        lastCallback(data);
        //console.log(data)
        if (trim) {data = data.trim()}
        if (data == expected) { resolve();}
      });
      if (timeout) {setTimeout(() => {reject('Timeout printing string in shell.')}, timeout * 1000)};
    });
    this.shellData.callbackFunction = lastCallback;
    return promised
  }

  async getExpressionOutput(expression = null){
    if (expression) {this.shell.write(expression + '\n')};
    let output = '';
    let seenOutput = false;
    let lastCallback = this.shellData.callbackFunction;
    let lastLineCB = this.shellData.lineCallback;
    let lastLine = null;

    let promised = await new Promise ((resolve, reject) => {

      this.shellData.onLine(line => {
        if ( !line.startsWith('>>> ') && !line.startsWith('... ')){
          seenOutput = true;
          output += line;
        }
        lastLine = line;
      });

      this.shellData.on(data => {
        if (lastLine && lastLine.startsWith('>>> ') && data == '>>> '){ resolve('') }
        else if (seenOutput && data == '>>> ') { resolve(output) }
        else{lastCallback(data)};
      });

    });

    this.shellData.lineCallback = lastLineCB;
    this.shellData.callbackFunction = lastCallback;
    return promised;
  }

  async pythonExpression(setupExpressions = [], teardownExpressions = []){

    //Setup Logic
    await this.writeInShell('python3\n','>>> ');

    for (let exp of setupExpressions){
      //console.log()
      await this.writeInShell(exp+'\n','>>> ');
    }

    let userStartSentinel = 'setupDone | aEVJgX5Mfr01czdSI7Ln'
    await this.writeInShell(`print('${userStartSentinel}')\n`, userStartSentinel, 0.5, true)

    this.shellData.on(data => {this.term.write(data)});
    this.termData.on(data => this.shell.write(data));

    let userOutput = await this.getExpressionOutput();

    //Teardown Logic
    this.termData.on(data => {});
    this.shellData.on(data => {});

    let teardownOutput = {}
    for (let exp of teardownExpressions){
      teardownOutput[exp] = await this.getExpressionOutput(exp)
      teardownOutput[exp] = teardownOutput[exp].trim()
    }

    this.shell.write('exit()\n');
    return {userOutput: userOutput, teardown: teardownOutput}
  }
}
