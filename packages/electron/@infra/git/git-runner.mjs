import EventEmitter      from 'events'
import { spawn }         from 'child_process'
import EventEmitterUtils from '../event-emitter-utils';
import path              from 'path';
import StreamUtils       from '../stream-utils';



export default class GitRunner{

	/**
	 *
	 * @param {String} dir The repository directory to run the commands
	 */
	constructor(dir){
		this._dir = path.join(dir);
	}



	async runTilEnd(command, params, options = { use_pager: false }){
		return StreamUtils.readTilEnd(this.run(command, params, options));
	}



	run(command, params, options = { use_pager: false }){
		const dir_args = !!this._dir ? ['-C', this._dir] : [];
		const pager_args = options.use_pager ? [] : ['--no-pager'];
		const args = [];

		args.push(...pager_args);
		args.push(...dir_args);
		command = command.replace(/^\s*git\s+/i, '');
		args.push(...command.split(/\s+/)); // TODO ignore spaces between quotes
		if(Array.isArray(params))
			args.push(...params.filter(p => !!p));

		if(process.env.NODE_ENV !== 'production')
			console.log(`>> RUNNING: $ git ${args.join(' ')}`);

		const cp = spawn('git', args, {
			stdio: [ 'ignore', 'pipe', 'pipe' ]
		});

		const ee = new EventEmitter();
		EventEmitterUtils.reEmit('data', cp.stderr, ee, data => new Error(data.toString()));
		EventEmitterUtils.reEmit('error', cp.stderr, ee);

		EventEmitterUtils.reEmit('data', cp.stdout, ee);
		EventEmitterUtils.reEmit('end', cp.stdout, ee);

		return ee;
	}

}