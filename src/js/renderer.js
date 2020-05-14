const fs = require('fs');
const CommandLine = require("./CommandLine.js");
const cmd = new CommandLine(document.getElementById('xterm'), {
  cursorStyle:'bar',
  cols: 80,
  rows: 45,
  allowTransparency:true,
  theme:{background: 'rgba(255, 255, 255, 0.0)'}
});

function updateProgressDisplay(current, total){
  let line = document.getElementById("progressLine");
  let exerciseNumber = document.getElementById("exerciseNumber");
  let totalExerciseNumber = document.getElementById("totalExerciseNumber");
  exerciseNumber.innerHTML = current;
  totalExerciseNumber.innerHTML = total;
  line.points[1].y  = ((current / total) * 99);
}

function updateMenuDisplay(){

}

async function updateActivityView(lesson){
  let exercises = require(`./../courses/testCourse/Exercises`);
  let pythonRender = async (generatorName) => {
    let incorrect = true;
    while (incorrect){
      let {question, pre, post, check} = exercises[generatorName]()
      cmd.promptTerminal(question)
      answer = await cmd.pythonExpression(pre, post)
      let {result, correctMessage, wrongMessage} = check(answer)
      if (result) {cmd.promptTerminal(correctMessage); incorrect = false;}
      else{cmd.promptTerminal(wrongMessage)}
      cmd.promptTerminal('')
    }
  }
  let promptRender = (prompt) => {
    cmd.promptTerminal(prompt)
  }

  const activityTypeHandlers = {
    prompt: promptRender,
    python: pythonRender
  }


  for (let i = 0; i < lesson.length; i++){
    let activity = lesson[i];
    updateProgressDisplay(i+1, lesson.length);
    await pythonRender(activity.exercise);
  }
}

async function renderLogic() {

  let courseName = 'testCourse';
  let coursePath = `./../courses/${courseName}/course.json`
  let courseObject = require(coursePath);
  let lesson = courseObject.lessons[0].activities
  console.log(lesson);

  updateMenuDisplay();
  updateActivityView(lesson);

}

// call the main function
renderLogic();
