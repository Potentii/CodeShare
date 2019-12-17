import { ipcMain }    from 'electron'
import Project        from './project/project';
import IPCCRUDBuilder from './@infra/ipc-crud-builder';
import * as ipc_md5   from './@infra/ipc-md5'



export async function setup(){

	new IPCCRUDBuilder('projects', Project).build();

	await ipc_md5.setup();

}



export async function unsetup(){
	ipcMain.removeAllListeners();
}

