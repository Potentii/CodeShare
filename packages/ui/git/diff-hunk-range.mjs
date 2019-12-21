export default class DiffHunkRange{

	/**
	 *
	 * @param {Number|String} start
	 * @param {Number|String} [size]
	 */
	constructor(start, size){
		this.start = Number(start);
		this.size = size ? Number(size) : 1;
	}

}