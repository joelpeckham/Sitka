var os = require('os');
var pty = require('node-pty');
var Terminal = require('xterm').Terminal;

// Initialize node-pty with an appropriate shell
const shell = process.env[os.platform() === 'win32' ? 'COMSPEC' : 'SHELL'];

let env = {
  HOME: process.cwd() + "/Home"
}

console.log(process.env, env)
const ptyProcess = pty.spawn(shell, [], {
  name: 'xterm-color',
  cols: 80,
  rows: 30,
  cwd: process.cwd() + "/Home",
  env: env
});

// Initialize xterm.js and attach it to the DOM
const xterm = new Terminal({
                          cursorStyle:'bar',
                          cols: 80,
                          rows: 30,
											    fontSize:13,fontFamily:"'IBM Plex Mono', monospace",
													allowTransparency:true,
													theme:{background: 'rgba(255, 255, 255, 0.0)'}
												  });
xterm.open(document.getElementById('xterm'));

// Setup communication between xterm.js and node-pty
xterm.onData(data => ptyProcess.write(data));
ptyProcess.on('data', data => xterm.write(data));