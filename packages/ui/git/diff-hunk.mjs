export default class DiffHunk{

	/**
	 *
	 * @param {DiffHunkRange} a_range
	 * @param {DiffHunkRange} b_range
	 * @param {DiffHunkLine[]} lines
	 * @param {Boolean} staged
	 */
	constructor(a_range, b_range, lines = [], staged = false){
		this.a_range = a_range;
		this.b_range = b_range;
		this.lines = lines;
		this.staged = staged;
	}

}