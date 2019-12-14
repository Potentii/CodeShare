const GitClass = electronRequire('electron').remote.getGlobal('GitClass');

/**
 *
 * @param {String} dir
 * @returns {Git}
 */
export default function Git(dir){
	return new GitClass(dir);
}