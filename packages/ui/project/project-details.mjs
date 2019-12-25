// import ProjectRemote     from './project-remote';
import ProjectGitConfigs from './project-git-configs';
import Account           from '../account/account';



export default class ProjectDetails{

	constructor(location, git_configs, account){
		this.location = location;
		this.git_configs = git_configs;
		this.account = account;
	}


	static from(obj){
		return new ProjectDetails(
			obj.location,
			// Array.isArray(obj.remotes) ? obj.remotes.map(ProjectRemote.from) : null,
			obj.git_configs ? ProjectGitConfigs.from(obj.git_configs) : null,
			obj.account ? Account.from(obj.account) : null,
		);
	}


}