
const LINE_MODE = Object.freeze({
	ADDED: 'ADDED',
	REMOVED: 'REMOVED',
	NO_NEW_LINE: 'NO_NEW_LINE',
	UNCHANGED: 'UNCHANGED',
});


export default class DiffHunkLine{

	constructor(mode, content){
		this.mode = mode;
		this.content = content;
	}


	static get LINE_MODE(){
		return LINE_MODE;
	}

}