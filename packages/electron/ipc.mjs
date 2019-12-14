import path             from 'path'
import { ipcMain, app } from 'electron'
import CodeError        from './@infra/error/code-error';
import Git              from './git/git';
// import GitRoot    from './git/git-root';
// import CommitRoot from './git/git';

global['GitClass'] = Git;

export async function setup(){

	ipcMain.on('git:log', async (e, data) => {
		if(data?.dir)
			e.sender.send('git:log@success', await new Git(data.dir).log());
		else
			e.sender.send('git:log@error');
	});

}



export async function unsetup(){
	ipcMain.removeAllListeners();
}

