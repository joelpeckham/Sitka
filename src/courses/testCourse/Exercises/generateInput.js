let helpers = require('./generatorHelpers.js');

module.exports = function generateInput(config = null) {

  let randNum = helpers.randomInt(-10000,10001);

  return {
    question: `Write a single expression that casts the user's input as an int and assigns the value to x.`,
    pre: [`pyInput = input`,`def input(prompt = ''):\n    pyInput(prompt)\n    return ('${randNum}')\n`], // set things up--variables, utility functions, etc.
    post: ['x'], // output whatever you asked the student to set up so we can check it
    check: function(response){
      return {
        result: (response.teardown.x == `${randNum}`),
        correctMessage: helpers.randomCorrectMessage(),
        wrongMessage: helpers.randomIncorrectMessage()
      }
    }
  }
}
