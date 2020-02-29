async function renderLogic() {
  let CommandLine = require("./CommandLine.js");
  const cmd = new CommandLine(document.getElementById('xterm'), {
    cursorStyle:'bar',
    cols: 80,
    rows: 30,
    fontSize:13,fontFamily:"'IBM Plex Mono', monospace",
  	allowTransparency:true,
  	theme:{background: 'rgba(255, 255, 255, 0.0)'}
  });
  cmd.prompt("Hello, Joel. I'm Sika.")
  cmd.prompt("In the python prompt, type an expression that results in: range(0, 10)")
  while (true){
    answer = await cmd.python()
    console.log(answer)
    if( answer.trim() == "range(0, 10)"){
      cmd.prompt("\nWow! That's correct!")
      break
    }
    else{
      cmd.prompt("\nNope. Try again.")
    }
  }
  cmd.prompt("Here's another prompt.")
  another = await cmd.python()
}

// call the main function
renderLogic();
