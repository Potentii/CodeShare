import url            from 'url'
import path           from 'path'
import dotenv         from 'dotenv'
import electron       from 'electron'
import electron_debug from 'electron-debug'
// import * as shortcuts from './shortcuts'
import * as ipc       from './ipc'
import * as globals   from './globals'


// console.log(electron);
const { app, BrowserWindow } = electron;


// *Getting the environment variables:
if(process.env.NODE_ENV === 'development')
	dotenv.config({ path: path.join(process.cwd(), `./.env.development`) });
else
	dotenv.config({ path: path.join(process.cwd(), `./resources/.env`) });


if(process.env.LOADED !== 'YES')
	throw new Error(`'.env' file could not be loaded properly`);


electron_debug();


/**
 * The main window frame
 * @type {Electron.BrowserWindow}
 */
let win = null;



/**
 * Window configurations
 * @type {Object}
 */
const settings = {
	window: {
		title: 'Code Share',
		minWidth:  process.env.WINDOW_MIN_WIDTH  || 50,
		minHeight: process.env.WINDOW_MIN_HEIGHT || 50,
		width:  process.env.WINDOW_WIDTH  || 1024,
		height: process.env.WINDOW_HEIGHT || 640,
		webPreferences: {
			nodeIntegration: true,
		},
		// alwaysOnTop: true,
		// fullscreen: true,
		// closable: false,
		// kiosk: true,
		center: true,
		backgroundColor: '#FFFFFF',
	},
	// *Checking if the address of the window content is HTTP(S):
	address: /^http/i.test(process.env.PAGE_ADDRESS)
		// *If it is, simply setting it as the address:
		? process.env.PAGE_ADDRESS
		// *If it's not, assuming the address is a file relative to the project root:
		: url.format({
			protocol: 'file',
			slashes: true,
			pathname: path.join(process.cwd(), process.env.PAGE_ADDRESS)
		})
};



// *When electron is ready:
app.on('ready', async () => {
	// *Creating the window frame:
	await createWindow(settings);
});


app.on('will-quit', async e => {
	await ipc.unsetup();
	await globals.unsetup();
	// shortcuts.unsetup();
});


// *When all windows get closed:
app.on('window-all-closed', () => {
	// *Checking if the OS is a Macintosh:
	if(process.platform !== 'darwin')
		// *If it's not:
		// *Quitting the application:
		app.quit();
});


// *When user re-focus the application:
app.on('activate', async () => {
	// *Checking if windows reference is lost:
	if(win === null)
		// *If it is:
		// *Creates the window again:
		await createWindow(settings);
});


/**
 * Creates a new window frame
 * @author Guilherme Reginaldo Ruella
 */
async function createWindow(settings){

	const window_settings = settings.window;
	window_settings.show = false;

	await app.whenReady();

	electron.Menu.setApplicationMenu(null);

	// *Setting up the window frame:
	win = new BrowserWindow(window_settings);

	// *When the window closes:
	win.on('closed', () => {
		// *Removing the window reference:
		win = null;
	});

	win.once('ready-to-show', () => {
		// *Displaying the window frame:
		win.show();
	});

	// *Loading the html file:
	win.loadURL(settings.address);

	// *Removing the default menu bar:
	win.setMenu(null);

	// shortcuts.setup(win);

	await ipc.setup();
	await globals.setup();
}
