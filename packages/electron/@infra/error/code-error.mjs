export default class CodeError extends Error{

	/**
	 * @param {string} code
	 * @param {string} [message]
	 */
	constructor(code, message){
		super(message);
		this.message = message;
		this.code = code;
		this.name = this.constructor.name;
	}
}
