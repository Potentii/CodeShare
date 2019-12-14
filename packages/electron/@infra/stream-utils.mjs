import Flag         from './flag';
import TimeoutError from './error/timeout-error';



export default class StreamUtils{

	constructor(){}


	/**
	 * Reads an EventEmitter 'data' event until the 'end' or 'error' events
	 * @param ee The EventEmitter to be read
	 * @param options
	 * @returns {Promise<String>}
	 */
	static async readTilEnd(ee, options = { timeout: 0, encoding: 'utf8' }){
		return new Promise((resolve, reject) => {
			const done = Flag.getFlag();
			let content = '';

			const timeout = (options.timeout > 0)
				? setTimeout(() => on_error_handler.call(this, new TimeoutError(`Timeout reached`)), options.timeout)
				: null;

			var on_data_handler = data => {
				if(done.isUp())
					return;
				if(!!data)
					content += data.toString();
			};
			var on_end_handler = () => {
				if(done.isUp())
					return;
				done.up();
				resolve(content);
				content = null;
				ee.off('data', on_data_handler);
				ee.off('end', on_end_handler);
				ee.off('error', on_error_handler);
				if(timeout !== null)
					clearInterval(timeout);
			};
			var on_error_handler = err => {
				if(done.isUp())
					return;
				done.up();
				reject(err);
				content = null;
				ee.off('data', on_data_handler);
				ee.off('end', on_end_handler);
				ee.off('error', on_error_handler);
				if(timeout !== null)
					clearInterval(timeout);
			};

			ee
				.on('data', on_data_handler)
				.on('end', on_end_handler)
				.on('error', on_error_handler)
		});

	}

}