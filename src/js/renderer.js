async function renderLogic() {

  let CommandLine = require("./CommandLine.js");
  const cmd = new CommandLine(document.getElementById('xterm'), {
    cursorStyle:'bar',
    cols: 80,
    rows: 45,
  	allowTransparency:true,
  	theme:{background: 'rgba(255, 255, 255, 0.0)'}
  });

  let exercises = require("./../exercises/");

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

  let lesson = [
    {type:'prompt', content:"Starting lesson."},
    {type:'python', content:"generateAddition"},
    {type:'prompt', content:"Ok. Here's a harder type of question:"},
    {type:'python', content:"generateLists"},
    {type:'prompt', content:"Ok. We're done for the day."},
  ]

  const typeHandlers = {
    prompt: promptRender,
    python: pythonRender
  }

  for (let activity of lesson){
    await typeHandlers[activity.type](activity.content)
  }
}

// call the main function
renderLogic();
