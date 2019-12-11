if(typeof require === 'function'){
	window.electronRequire = require;
	delete window.require;
	delete window.exports;
	delete window.module;
	window.nodeRequire = electronRequire('electron').remote.require;
}