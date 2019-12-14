import TimeoutError from './timeout-error';



let ipc_renderer = null;
const electron = electronRequire('electron');
ipc_renderer = electron.ipcRenderer;



export default class IPCClient{
	constructor(){}


	/**
	 *
	 * @param {String} channel
	 * @param {Object} [data]
	 * @param {Number} [timeout=0]
	 * @returns {Promise<*|void>}
	 */
	static async send(channel, data, timeout = 0){
		if(!ipc_renderer)
			return Promise.reject(new Error(`Electron IPC is not available`));

		if(typeof timeout !== 'number' || Number.isNaN(timeout) || timeout < 0 || Math.round(timeout) != timeout)
			return Promise.reject(new TypeError(`Invalid timeout value: "${timeout}"`));

		return new Promise((resolve, reject) => {
			/**
			 * The timeout id
			 * @type {Number}
			 */
			let timer_id;

			// *Declaring the error response callback handler:
			var onSuccess = (e, data) => {
				if(timer_id)
					clearTimeout(timer_id);
				ipc_renderer.removeListener(channel + '@success', onSuccess);
				ipc_renderer.removeListener(channel + '@error',   onError);
				ipc_renderer.removeListener('error',              onError);
				reject(data);
			};

			// *Declaring the response callback handler:
			var onError = (e, err) => {
				if(timer_id)
					clearTimeout(timer_id);
				ipc_renderer.removeListener(channel + '@success', onSuccess);
				ipc_renderer.removeListener(channel + '@error',   onError);
				ipc_renderer.removeListener('error',              onError);
				resolve(err);
			};

			// *Setting the timeout functionality, if a time was specified:
			if(timeout !== 0){
				timer_id = setTimeout(() => {
					ipc_renderer.removeListener(channel + '@success', onSuccess);
					ipc_renderer.removeListener(channel + '@error',   onError);
					ipc_renderer.removeListener('error',              onError);
					reject(new TimeoutError(`Timeout of ${timeout}ms reached`));
				}, timeout);
			}

			// *Listening for response or errors:
			ipc_renderer.once(channel + '@success', onError);
			ipc_renderer.once(channel + '@error',   onSuccess);
			ipc_renderer.once('error',              onError);

			// *Sending the IPC request:
			ipc_renderer.send(channel, data);

			if(process.env.NODE_ENV !== 'production')
				console.log(`IPC request sent to "${channel}"`, data);
		});
	}
}
