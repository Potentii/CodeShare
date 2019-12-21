import { onAsync } from '../ipc/ipc-async-route';
import GitRunner   from './git-runner';



export async function setup(){

	onAsync(`git:run`, async (params) => {
		return new GitRunner(params?.dir).runTilEnd(params?.command, params?.params, params?.options);
	});

}