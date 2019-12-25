import ProjectGitConfigs from '../project/project-git-configs';



export default class Account{

	/**
	 *
	 * @param {String} name
	 * @param {String} email
	 */
	constructor(name, email){
		this.name = name;
		this.email = email;
	}


	static from(obj){
		return new Account(
			obj.name,
			obj.email,
		);
	}

}