import Remote from './remote';



export default class GitRemote{

	/**
	 *
	 * @param {GitIPCClient} git_client The git interface
	 */
	constructor(git_client){
		this.git_client = git_client;
	}


	/**
	 *
	 * @param name
	 * @param url
	 * @returns {Promise<void>}
	 * @see https://git-scm.com/docs/git-remote#Documentation/git-remote.txt-emaddem
	 */
	async add(name, url){
		const data = await this.git_client.run('git remote add', [ name, url ]);

		if(data.includes(`fatal: remote`) && data.includes(`already exists.`))
			throw new Error(`Cannot add remote: "${name}" remote is already defined`);
	}


	/**
	 *
	 * @param name
	 * @returns {Promise<void>}
	 * @see https://git-scm.com/docs/git-remote#Documentation/git-remote.txt-emremoveem
	 */
	async remove(name){
		const data = await this.git_client.run('git remote remove', [ name ]);

		if(data.includes(`fatal: No such remote:`))
			throw new Error(`Cannot remove remote: "${name}" remote is not defined`);
	}


	/**
	 *
	 * @returns {Promise<Remote[]>}
	 * @see https://git-scm.com/docs/git-remote
	 */
	async getAll(){
		const data = await this.git_client.run('git remote --verbose');

		const remotes = [];
		const regex = /(?<name>.*?)\s(?<url>.*)\s\((?<type>.*)\)([\n\r]|$)/ig;
		let match;
		while((match = regex.exec(data)) !== null)
			remotes.push(new Remote(
				match.groups.name,
				match.groups.url,
				match.groups.type,
			));

		return remotes;
	}

}