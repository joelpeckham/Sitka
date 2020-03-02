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


  cmd.prompt("Hello, Joel. I'm Sika.")
  cmd.prompt("Here's a python prompt.")
  cmd.prompt("Type an expression that returns a list of ints 1-10 inclusive.")   //list(range(1,11))

  while (true){
    answer = await cmd.python()
    console.log(answer)
    if( answer.trim() == "[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"){
      cmd.prompt("\nWow! That's correct!")
      break
    }
    else{
      cmd.prompt("\nNope. Try again.")
    }
  }

  cmd.prompt("Ok. We're done for the day.")
}

// call the main function
renderLogic();
