import { ipcMain }    from 'electron'
import Project        from './project/project';
import IPCCRUDBuilder from './@infra/ipc-crud-builder';



export async function setup(){

	new IPCCRUDBuilder('projects', Project).build();

}



export async function unsetup(){
	ipcMain.removeAllListeners();
}

