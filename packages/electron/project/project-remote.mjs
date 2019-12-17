export default class ProjectRemote{

	constructor(name, url, is_active){
		this.name = name;
		this.url = url;
		this.is_active = is_active;
	}


	static from(obj){
		return new ProjectRemote(
			obj.name,
			obj.url,
			obj.is_active,
		);
	}


}