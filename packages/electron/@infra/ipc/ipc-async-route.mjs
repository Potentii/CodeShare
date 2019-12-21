import { ipcMain } from 'electron'
import IPCEnvelope from './ipc-envelope'



export function onAsync(channel, async_fn){
	ipcMain.on(channel, async (e, req) => {
		try{
			req = IPCEnvelope.from(req);
			e.sender.send(channel, IPCEnvelope.data(req.id, await async_fn.call(this, req.data)));
		} catch(err){
			e.sender.send(channel, IPCEnvelope.error(req.id, err));
		}
	});
}