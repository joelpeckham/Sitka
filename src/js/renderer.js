/**
 * os is an Electron object for operating system interaction.
 * @type {Object}
 */
var os = require('os');

/**
 * pty is an object used to spawn and interact with a shell on the user's system.
 * @type {Object}
 */
var pty = require('node-pty');

/**
 * Terminal is a class used to create xTerm terminal objects.
 * @type {Function}
 */
var Terminal = require('xterm').Terminal;

/**
 * shell holds the path to the shell to be spawned by node-pty.
 * @type {String}
 */
const shell = process.env[os.platform() === 'win32' ? 'COMSPEC' : 'SHELL'];

/**
 * env holds the environment variables for node-pty
 * @type {Object}
 */
let env = {
  HOME: process.cwd() + "/Home"
}

console.log(process.env, env)

/**
 * ptyProcess is the node-pty shell object.
 * This object is used to interact with the pty shell.
 * @type {Object}
 */
const ptyProcess = pty.spawn(shell, [], {
  name: 'xterm-color',
  cols: 80,
  rows: 30,
  cwd: process.cwd() + "/Home",
  env: env
});

// Initialize xterm.js and attach it to the DOM

/**
 * xterm is the xTerm object.
 * This is used to create the xTerm UI element.
 * @type {Object}
 */
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
