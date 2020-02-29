module.exports = class CommandLine {
  constructor(domElement, xTermOptionObject) {
    let Terminal = require('xterm').Terminal;
    this.lfc = 0
    this.os = require('os');
    this.pty = require('node-pty');
    this.term =  new Terminal(xTermOptionObject);
    this.term.open(domElement);
  }

  prompt(prompt){
    this.term.writeln(prompt)
  }

  async python(){
    this.prompt("\n"+"-".repeat(this.term.cols))
    console.log("I'm here!")
    let env = { HOME: process.cwd() + "/Home"}
    let shellname = process.env[this.os.platform() === 'win32' ? 'COMSPEC' : 'SHELL'];
    let shell = this.pty.spawn(shellname, [], {
      cols: 80, rows: 30,
      cwd: process.cwd() + "/Home",
      env: env,
      handleFlowControl: true
    });
    this.term.onData(data => {shell.write(data); lastData = data});
    shell.write('python3\n')

    let ansLog = null
    var lastData = null
    let seenPrompt = 0;

    let answer = await new Promise ((resolve, reject) => {
      shell.on('data', data => {
        if (data.endsWith(">>> ") && data != lastData) {
          seenPrompt++
        }
        if (seenPrompt == 1) {
          this.term.write(data);
          if (data.endsWith("\n") && !data.startsWith('...')){
            ansLog = data
          }
        }
        if (seenPrompt > 1) {
          resolve(ansLog);
        }
      });
    });
    this.prompt("\n"+"-".repeat(this.term.cols))
    return answer
  }
}
