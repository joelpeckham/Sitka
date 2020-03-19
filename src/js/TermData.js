module.exports = class TermData {
  constructor(term){
    this.term = term;
    this.callbackFunction = (data) => {}
    this.blockData = false

    this.term.onData(data => {
      console.dir({data:data})
      if (this.isGoodData(data)) {this.callbackFunction(data)}
    })
  }

  on(callbackFunction){
    this.callbackFunction = callbackFunction
  }

  isGoodData(data){
    let badStrings = ["[A","[B", "", "", ""]
    if (this.blockData && badStrings.indexOf(data) >= 0) {return false}
    return true
  }
}
