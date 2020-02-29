module.exports = class TerminalManager {
  constructor(ptyProcessObject, xTermProcessObject) {
    this.shell = ptyProcessObject;
    this.term = xTermProcessObject;

    this.term.onData(data => this.onTermData(data));
    this.shell.on('data', data => this.onShellData(data));
  }

  onTermData(data){
    this.shell.write(data);
  }

  onShellData(data){
      this.term.write(data)
  }

  examineShellData(data){

  }
}
