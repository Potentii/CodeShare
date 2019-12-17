import { ipcMain } from "electron";



export function onAsync(channel, async_fn){
	ipcMain.on(channel, async (e, params) => {
		try{
			e.sender.send(`${channel}@success`, await async_fn.call(this, params));
		} catch(err){
			e.sender.send(`${channel}@error`, err);
		}
	});
}