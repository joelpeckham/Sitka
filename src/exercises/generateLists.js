function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

module.exports = function generateLists(config = null) {

  let randomList = []
  let randomListx2 = []

  for (let i = 0; i < 5; i++){
    rand = getRandomInt(-100,101)
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
        correctMessage: "You got it right",
        wrongMessage: "You're WRONG!"
      }
    }
  }
}
