export default class Commit{

	/**
	 *
	 * @param {String} hash
	 * @param {String} short_hash
	 * @param {CommitPerson} author
	 * @param {CommitPerson} committer
	 * @param {String} message
	 */
	constructor(hash, short_hash, author, committer, message){
		this.hash = hash;
		this.short_hash = short_hash;
		this.author = author;
		this.committer = committer;
		this.message = message;
	}

}