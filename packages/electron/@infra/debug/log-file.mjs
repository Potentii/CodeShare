import path from 'path'
import fs from 'fs'



export default class DebugLogFile{
	constructor(){

	}


	static write(data){
		const date = new Date()
			.toISOString()
			.replace(/:/g, '-')
			.replace('T', ' ')
			.replace('Z', '');
		const log_file_name = 'log-' + date + '-' + Math.floor(Math.random() * 1000000) + '.txt';
		fs.writeFileSync(path.join(process.cwd(), log_file_name), data)
	}
}