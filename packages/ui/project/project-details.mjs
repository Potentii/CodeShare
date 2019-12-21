import ProjectRemote     from './project-remote';
import ProjectGitConfigs from './project-git-configs';



export default class ProjectDetails{

	constructor(location, remotes = [], git_configs){
		this.location = location;
		this.remotes = remotes;
		this.git_configs = git_configs;

	}


	static from(obj){
		return new ProjectDetails(
			obj.location,
			Array.isArray(obj.remotes) ? obj.remotes.map(ProjectRemote.from) : null,
			obj.git_configs ? ProjectGitConfigs.from(obj.git_configs) : null,
		);
	}


}