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


  cmd.promptTerminal("Hello, Joel. I'm Sika.")
  cmd.promptTerminal("Here's a python prompt.")
  cmd.promptTerminal("Type an expression that returns a list of ints 1-10 inclusive.")   //list(range(1,11))
  answer = await cmd.pythonExpression(['x = 10','from time import sleep', "y = 'hello' "], ['x','y'])
  console.dir(answer)
  cmd.promptTerminal("Ok. We're done for the day.")
}

// call the main function
renderLogic();
