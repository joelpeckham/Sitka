module.exports = class TermData {
  constructor(term){
    this.term = term;
    this.callbackFunction = (data) => {}
    this.term.onData(data => this.callbackFunction(data))
  }
  on(callbackFunction){
    this.callbackFunction = callbackFunction
  }
}
