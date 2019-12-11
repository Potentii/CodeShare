import { ipcMain, app } from 'electron'
import CodeError        from './@infra/error/code-error';



export function setup(){


}



export function unsetup(){
	ipcMain.removeAllListeners();
}

