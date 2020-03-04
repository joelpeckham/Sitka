let helpers = require('./generatorHelpers.js');

module.exports = function generateAddition(config = null) {

  let a = helpers.randomInt(-100,101);
  let b = helpers.randomInt(-100,101);
  let ans = a+b;

  return {
    question: `Write an expression that adds the variable a with b.`,
    pre: [`a = ${a}`,`b = ${b}`], // set things up--variables, utility functions, etc.
    post: [], // output whatever you asked the student to set up so we can check it
    check: function(response){
      return {
        result: (response.userOutput == ans),
        correctMessage: helpers.randomCorrectMessage(),
        wrongMessage: helpers.randomIncorrectMessage()
      }
    }
  }
}
