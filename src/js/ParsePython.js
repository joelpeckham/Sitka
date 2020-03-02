module.exports = class ParsePython {
  constructor(){
    this.userStartSentinel = 'setupDone | aEVJgX5Mfr01czdSI7Ln';

    this.answer = null;
    this.displaying = false;
    this.resolved = false;
    this.lastData = null;

    this.seenStartSentinel = false;
    this.pythonPromptCount = 0;
  }

  parse(data){

    if (this.seenStartSentinel){
      this.displaying = true;
      if (data == '>>> '){
        this.pythonPromptCount++;
        if (this.pythonPromptCount > 1){
          this.displaying = false;
          this.answer = this.lastData;
          this.resolved = true;
        }
      }
    }
    else{
      if (data.trim() == this.userStartSentinel) { this.seenStartSentinel = true };
    }

    this.lastData = data;
    return {resolved: this.resolved, answer: this.answer, display: this.displaying};
  }
}
