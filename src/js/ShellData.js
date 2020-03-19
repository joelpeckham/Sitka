module.exports = class ShellData {
  constructor(shell){
    this.shell = shell;
    this.callbackFunction = (data) => {};
    this.lineCallback = (data) => {};
    this.shell.on('data', data => {
      this.callbackFunction(data);
      this.buildLines(data);
      this.lastData = data;
    });
    this.lastLine = ''
    this.lastData = null
  }
  on(callbackFunction){
    this.callbackFunction = callbackFunction;
  }

  onLine(callbackFunction){
    this.lineCallback = callbackFunction;
  }

  buildLines(data){

    let newLineIndex = data.indexOf('\n');

    if (newLineIndex != -1){
      this.lastLine += data.slice(0,newLineIndex + 1);
      let tail = data.slice(newLineIndex + 1);
      this.lineCallback(this.lastLine);
      this.lastLine = '';
      this.buildLines(tail);
    }

    else{
      this.lastLine += data;
    }

  }

}
