
/**
 * Terminal is a class used to create xTerm terminal objects.
 * @type {Function}
 */
let Terminal = require('xterm').Terminal;

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

let ShellManager = require("./ShellManager.js");
const shellMan = new ShellManager(xterm)

shellMan.connect('live')
