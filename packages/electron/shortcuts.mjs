import { globalShortcut } from 'electron'



function setupDev(win){
	globalShortcut.register('F10', () => { // TODO make it work with F12
		win.toggleDevTools();
	});

	globalShortcut.register('F5', () => {
		win.reload();
	});

	globalShortcut.register('CmdOrCtrl+R', () => {
		win.reload();
	});

	globalShortcut.register('CmdOrCtrl+Shift+R', () => {
		win.reload();
	});
}



function setupProd(win){
	// TODO investigate why these overrides are not working:

	globalShortcut.register('CmdOrCtrl+Shift+Esc', () => {

	});

	globalShortcut.register('CmdOrCtrl+Alt+Delete', () => {

	});

	globalShortcut.register('CmdOrCtrl+AltGr+Delete', () => {

	});

	globalShortcut.register('Alt+Tab', () => {

	});

	globalShortcut.register('AltGr+Tab', () => {

	});

	// globalShortcut.register('Super', () => {
	//
	// });

	globalShortcut.register('Super+Tab', () => {

	});
}



export function setup(win){
	switch(process.env.NODE_ENV){
	case 'development': return setupDev(win);
	default:            return setupProd(win);
	}
}



export function unsetup(){
	globalShortcut.unregisterAll();
}
