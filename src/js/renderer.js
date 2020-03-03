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
  let generateLists = exercises.generateLists;

  cmd.promptTerminal(`Hello, Joel. I'm ${cmd.color.red}Sika.${cmd.color.reset}`)
  cmd.promptTerminal("Here's a python prompt.\n")

  let incorrect = true;
  while (incorrect){

    let {question, pre, post, check} = generateLists()
    cmd.promptTerminal(question)
    answer = await cmd.pythonExpression([pre], [post])
    let {result, correctMessage, wrongMessage} = check(answer)
    if (result) {cmd.promptTerminal(correctMessage); incorrect = false;}
    else{cmd.promptTerminal(wrongMessage)}
    cmd.promptTerminal('')
  }

  console.dir(answer)
  cmd.promptTerminal("Ok. Lesson's Over.")
}

// call the main function
renderLogic();
