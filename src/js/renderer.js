async function renderLogic() {
  let CommandLine = require("./CommandLine.js");
  const cmd = new CommandLine(document.getElementById('xterm'), {
    cursorStyle:'bar',
    cols: 80,
    rows: 45,
    fontSize:13,fontFamily:"'IBM Plex Mono', monospace",
  	allowTransparency:true,
  	theme:{background: 'rgba(255, 255, 255, 0.0)'}
  });

  let generateLists = require("./../exercises/generateLists.js")



  cmd.promptTerminal(`Hello, Joel. ${cmd.color.red}I'm Sika.${cmd.color.reset}`)
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
