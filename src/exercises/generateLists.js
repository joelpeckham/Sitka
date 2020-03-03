let helpers = require('./generatorHelpers.js');
console.dir(helpers)
module.exports = function generateLists(config = null) {

  let randomList = []
  let randomListx2 = []

  for (let i = 0; i < 5; i++){
    let rand = helpers.randomInt(-100,101);
    randomList.push(rand)
    randomListx2.push(rand*2)
  }
  randomList = "[" + randomList.join(', ') + "]"
  randomListx2 = "[" + randomListx2.join(', ') + "]"

  return {
    question: `Write an expression that multiplies each value in the list y by two.`,
    pre: `y = ${randomList}`, // set things up--variables, utility functions, etc.
    post: "y", // output whatever you asked the student to set up so we can check it
    check: function(response){
      console.log(response)
      return {
        result: (response.teardown.y == randomListx2),
        correctMessage: helpers.randomCorrectMessage(),
        wrongMessage: helpers.randomIncorrectMessage()
      }
    }
  }
}
