export default class Remote{

	constructor(name, url, type){
		this.name = name;
		this.url = url;
		this.type = type;
	}


	get is_fetch(){
		return this.type == 'fetch';
	}


	get is_push(){
		return this.type == 'push';
	}

}