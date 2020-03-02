module.exports = class ShellData {
  constructor(shell){
    this.shell = shell;
    this.callbackFunction = (data) => {}
    this.shell.on('data', data => this.callbackFunction(data))
  }
  on(callbackFunction){
    this.callbackFunction = callbackFunction
  }
}
