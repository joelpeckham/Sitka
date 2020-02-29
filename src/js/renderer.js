/**
 * os is an Electron object for operating system interaction.
 * @type {Object}
 */
let os = require('os');

/**
 * pty is an object used to spawn and interact with a shell on the user's system.
 * @type {Object}
 */
let pty = require('node-pty');

/**
 * Terminal is a class used to create xTerm terminal objects.
 * @type {Function}
 */
let Terminal = require('xterm').Terminal;

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
  env: env,
  handleFlowControl: false
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

let ShellTerminalLinkingManager = require("./TerminalManager.js");
const dataFlow = new ShellTerminalLinkingManager(ptyProcess, xterm)
