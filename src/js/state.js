var fs = require('fs');
module.exports = class ApplicationState{
  constructor(stateFile = './../state.json'){
    this.stateFile = stateFile;
    this.state = require(stateFile)
  }
  set(attribute, value){
    this.state[attribute] = value;
    fs.writeFile(this.stateFile, JSON.stringify(this.state), function (err) {
      if (err) throw err;
      console.log(`Saved ${value} to ${attribute}`);
    });
  }
  get(attribute){
    return this.state[attribute]
  }
}
