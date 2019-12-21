export default class IPCEnvelope{

	constructor(){
		/**
		 *
		 * @type {String}
		 * @private
		 */
		this._id = undefined;
		/**
		 *
		 * @type {Object|Array|undefined}
		 * @private
		 */
		this._data = undefined;
		/**
		 *
		 * @type {Error|undefined}
		 * @private
		 */
		this._error = undefined;
	}


	/**
	 *
	 * @param {Object|IPCEnvelope} obj
	 * @returns {IPCEnvelope}
	 */
	static from(obj){
		const envelope = new IPCEnvelope();
		envelope.setId(obj._id);
		envelope.setData(obj._data);
		envelope.setError(obj._error);
		return envelope;
	}


	/**
	 *
	 * @param {String} id
	 * @param {Object} data
	 * @returns {IPCEnvelope}
	 */
	static data(id, data){
		return new IPCEnvelope().setId(id).setData(data);
	}


	/**
	 *
	 * @param {String} id
	 * @param {Error} error
	 * @returns {IPCEnvelope}
	 */
	static error(id, error){
		return new IPCEnvelope().setId(id).setError(error);
	}


	/**
	 *
	 * @param {Object|Array} data
	 * @returns {IPCEnvelope}
	 */
	setData(data){
		this._data = data;
		return this;
	}


	/**
	 *
	 * @returns {Object|Array|undefined}
	 */
	get data(){
		return this._data;
	}


	/**
	 *
	 * @param {Error|undefined} error
	 * @returns {IPCEnvelope}
	 */
	setError(error){
		this._error = error;
		return this;
	}


	/**
	 *
	 * @returns {Error|undefined}
	 */
	get error(){
		return this._error;
	}


	/**
	 *
	 * @param {String} id
	 * @returns {IPCEnvelope}
	 */
	setId(id){
		this._id = id;
		return this;
	}


	/**
	 *
	 * @returns {String}
	 */
	get id(){
		return this._id;
	}

}