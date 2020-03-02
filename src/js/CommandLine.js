let Terminal = require('xterm').Terminal;
let os = require('os');
let pty = require('node-pty');
let ParsePython = require('./ParsePython.js');

module.exports = class CommandLine {
  constructor(domElement, xTermOptionObject) {
    this.term = new Terminal(xTermOptionObject);
    this.term.open(domElement);
  }

  prompt(prompt){
    this.term.writeln(prompt)
  }

  async python(){

    this.prompt("\n"+"-".repeat(this.term.cols)+'\n')

    let parser = new ParsePython()

    let shell = pty.spawn('bash', [], {
      cols: this.term.cols, rows: this.term.rows,
      cwd: process.cwd() + "/Home",
      env: { HOME: process.cwd() + "/Home"}
    });

    this.term.onData(data => {shell.write(data)});

    shell.write('python3\n')

    let answer = await new Promise ((resolve, reject) => {
      shell.on('data', data => {
        let {resolved, answer, display} = parser.parse(data);
        if (resolved) {resolve(answer)};
        if (display) {this.term.write(data)};
      });
    });

    this.term.onData(data => {});
    this.prompt("\n"+"-".repeat(this.term.cols))
    return answer
  }
}
