module.exports = class ParsePython {
  constructor(){
    this.answer = null
    this.lastData = null
    this.seenPrompt = 0;
  }

  parse(data){

    let display = false;
    let resolved = false;

    if (data.endsWith(">>> ") && data != this.lastData) {
      this.seenPrompt++
    }
    if (this.seenPrompt == 1) {
      display = true;
      if (data.endsWith("\n") && !data.startsWith('...')){
        this.answer = data
      }
    }
    if (this.seenPrompt > 1) {
      resolved = true
    }
    return {resolved:resolved, answer: this.answer, display: display};
  }
}
