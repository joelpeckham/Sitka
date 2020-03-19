const fs = require('fs');
const CommandLine = require("./CommandLine.js");

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


  for (let activity of lesson){
    await activityTypeHandlers[activity.type](activity.content)
  }
}

// call the main function
renderLogic();
