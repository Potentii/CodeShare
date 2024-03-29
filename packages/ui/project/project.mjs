import ProjectDetails from './project-details';



export default class Project{

	/**
	 *
	 * @param {String} _id
	 * @param {String} name
	 * @param {ProjectDetails} details
	 */
	constructor(_id, name, details){
		this._id = _id;
		this.name = name;
		this.details = details;
	}


	static from(obj){
		return new Project(
			obj._id,
			obj.name,
			obj.details ? ProjectDetails.from(obj.details) : null,
		);
	}


	get id(){
		return this._id;
	}


}