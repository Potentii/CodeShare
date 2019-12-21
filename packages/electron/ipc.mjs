import { ipcMain }    from 'electron'
import * as ipc_md5   from './@infra/ipc-md5'
import * as ipc_store from './@infra/ipc-store'
import * as ipc_git   from './@infra/git/ipc-git'



export async function setup(){

	await ipc_md5.setup();

	await ipc_store.setup();

	await ipc_git.setup();

}



export async function unsetup(){
	ipcMain.removeAllListeners();
}

