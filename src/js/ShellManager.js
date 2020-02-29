module.exports = class ShellManager {
  constructor(xTermInstance) {
    let os = require('os');
    let pty = require('node-pty');
    const shell = process.env[os.platform() === 'win32' ? 'COMSPEC' : 'SHELL'];
    let env = { HOME: process.cwd() + "/Home"}
    this.shells = {
      live: pty.spawn(shell, [], {
        cols: 80, rows: 30,
        cwd: process.cwd() + "/Home",
        env: env,
      }),
      dead: pty.spawn(shell, [], {
        cols: 80, rows: 30,
        cwd: process.cwd() + "/Home",
        env: env,
      })
    }
    this.term = xTermInstance
  }

  connect(source){
    this.term.onData(data => this.shells[source].write(data));
    this.shells[source].on('data', data => this.term.write(data));
  }
}
