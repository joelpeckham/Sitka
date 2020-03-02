let Terminal = require('xterm').Terminal;
let os = require('os');
let pty = require('node-pty');
let ParsePython = require('./ParsePython.js');
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

  prompt(prompt){
    this.term.writeln(prompt)
  }

  async pythonExpression(){

    this.prompt("\n"+"-".repeat(this.term.cols)+'\n')
    this.termData.on(data => this.shell.write(data))
    let parser = new ParsePython()

    //Setup Logic
    this.shell.write('python3\n')
    this.shell.write("from time import sleep\n")
    this.shell.write("print('setupDone | aEVJgX5Mfr01czdSI7Ln')\n")

    let answer = await new Promise ((resolve, reject) => {
      this.shellData.on(data => {
        let {resolved, answer, display} = parser.parse(data);
        if (resolved) {resolve(answer)};
        if (display) {this.term.write(data)};
      });
    });


    //Teardown Logic
    this.termData.on(data => {});
    this.shellData.on(data => {});
    this.shell.write('exit()\n');
    this.prompt("\n"+"-".repeat(this.term.cols));
    return answer
  }
}
