const fs = require('fs');
const CommandLine = require("./CommandLine.js");

function updateProgressDisplay(current, total){
  let line = document.getElementById("progressLine");
  let exerciseNumber = document.getElementById("exerciseNumber");
  let totalExerciseNumber = document.getElementById("totalExerciseNumber");
  exerciseNumber.innerHTML = current;
  totalExerciseNumber.innerHTML = total;
  line.points[1].y  = ((current / total) * 99);
}

async function renderLogic() {

  const cmd = new CommandLine(document.getElementById('xterm'), {
    cursorStyle:'bar',
    cols: 80,
    rows: 45,
  	allowTransparency:true,
  	theme:{background: 'rgba(255, 255, 255, 0.0)'}
  });

  let courseName = 'testCourse';
  let lessonName = 'testLesson';

  let lessonPath = `./../courses/${courseName}/${lessonName}.json`
  let exercisePath = `./../courses/${courseName}/Exercises`
  let lessonObject = require(lessonPath);
  let lesson = lessonObject.activities
  let exercises = require(exercisePath);

  //activityTemplate = {type:'python', content: "generatorName"} or {type:'prompt', content: "text"}
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
    await activityTypeHandlers[activity.type](activity.content);
    updateProgressDisplay(i+1, lesson.length);
  }
}

// call the main function
renderLogic();
