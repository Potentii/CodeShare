
const LINE_MODE = Object.freeze({
	ADDED: 'ADDED',
	REMOVED: 'REMOVED',
	NO_NEW_LINE: 'NO_NEW_LINE',
	UNCHANGED: 'UNCHANGED',
});


export default class DiffHunkLine{

	/**
	 *
	 * @param {String} mode
	 * @param {String} content
	 * @param {Number} number_a
	 * @param {Number} number_b
	 */
	constructor(mode, content, number_a, number_b){
		this.mode = mode;
		this.content = content;
		this.number_a = number_a;
		this.number_b = number_b;
	}


	static get LINE_MODE(){
		return LINE_MODE;
	}

}