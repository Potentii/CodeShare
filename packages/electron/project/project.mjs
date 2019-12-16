export default class Project{

	constructor(_id, name, location){
		this._id = _id;
		this.name = name;
		this.location = location;
	}


	static from(obj){
		return new Project(
			obj._id,
			obj.name,
			obj.location,
		);
	}


	get id(){
		return this._id;
	}


}