export default class ProjectGitConfigs{

	constructor(bin_type){
		this.bin_type = bin_type || 'EMBEDDED'; // 'SYSTEM' or 'EMBEDDED'
	}


	static from(obj){
		return new ProjectGitConfigs(
			obj.bin_type,
		);
	}


}