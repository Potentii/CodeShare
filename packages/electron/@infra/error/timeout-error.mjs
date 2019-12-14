export default class TimeoutError extends Error{

	/**
	 * @param {string} [message]
	 */
	constructor(message){
		super(message);
		this.message = message;
		this.name = this.constructor.name;
	}
}