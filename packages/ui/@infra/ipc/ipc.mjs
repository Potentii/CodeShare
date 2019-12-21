import TimeoutError from './timeout-error';
import IPCEnvelope  from '@code-share/electron/@infra/ipc/ipc-envelope';



const SHOW_DEBUG_LOGS = false;

const electron = electronRequire('electron');
const ipc_renderer = electron.ipcRenderer;


function randomId(){
	return Math.round(Math.random() * 100000000) + '';
}


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
			const req = IPCEnvelope.data(randomId(), data);

			const timer_id = (timeout !== 0)
				? setTimeout(() => {
					cb(null, IPCEnvelope.error(req.id, new TimeoutError(`Timeout of ${timeout}ms reached`)));
				}, timeout)
				: null;

			// *Declaring the response callback handler:
			var cb = (_, res) => {
				res = IPCEnvelope.from(res);
				if(res.id != req.id)
					return;

				ipc_renderer.removeListener(channel, cb);
				if(timer_id !== null)
					clearTimeout(timer_id);

				if(res.error){
					if(process.env.NODE_ENV !== 'production' && SHOW_DEBUG_LOGS)
						console.error(`Received an IPC error response on "${channel}" ID(${res.id})`, res.error);
					return reject(res.error);
				}

				resolve(res.data);
			};

			ipc_renderer.on(channel, cb);

			// *Sending the IPC request:
			ipc_renderer.send(channel, req);

			if(process.env.NODE_ENV !== 'production' && SHOW_DEBUG_LOGS)
				console.log(`IPC request sent to "${channel}" ID(${req.id})`, req.data);
		});
	}
}
