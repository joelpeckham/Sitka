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
    this.shellData = new ShellData(this.shell)
    this.termData = new TermData(this.term)
  }

  promptTerminal(prompt){
    this.term.writeln(prompt)
  }

  async writeInShell(str, expected, timeout = 0.1, trim = false){
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

  async getExpression(){
    let output = '';
    let seenOutput = false;
    let lastCallback = this.shellData.callbackFunction;
    let lastLineCB = this.shellData.lineCallback;

    let promised = await new Promise ((resolve, reject) => {

      this.shellData.onLine(line => {
        if ( !line.startsWith('>>> ') && !line.startsWith('... ')){
          seenOutput = true;
          output += line;
        }
      });

      this.shellData.on(data => {
        if (seenOutput && data == '>>> ') { resolve(output) }
        else{this.term.write(data)};
      });

    });

    this.shellData.lineCallback = lastLineCB;
    this.shellData.callbackFunction = lastCallback;
    return promised;
  }

  async pythonExpression(setupExpressions = [], teardownExpressions = []){

    this.promptTerminal("\n"+"-".repeat(this.term.cols)+'\n')

    //Setup Logic
    await this.writeInShell('python3\n','>>> ');
    await this.writeInShell("from time import sleep\n",'>>> ');

    let userStartSentinel = 'setupDone | aEVJgX5Mfr01czdSI7Ln'
    await this.writeInShell(`print('${userStartSentinel}')\n`, userStartSentinel, 0.1, true)

    this.shellData.on(data => {this.term.write(data)});
    this.termData.on(data => this.shell.write(data));

    let userOutput = await this.getExpression();

    //Teardown Logic
    this.termData.on(data => {});
    this.shellData.on(data => {});
    this.shell.write('exit()\n');
    return ""
  }
}
