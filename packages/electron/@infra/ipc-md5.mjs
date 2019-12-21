import crypto      from 'crypto'
import { onAsync } from './ipc/ipc-async-route';



export async function setup(){

	onAsync(`cry:md5`, async (params) => {
		return new Promise((resolve, reject) => {
			const data = params?.data;
			if(!data)
				return resolve({ digest: null });

			const hash = crypto.createHash('md5');
			hash.on('readable', () => {
				const hashed = hash.read();
				if(!hashed)
					return;
				resolve({ digest: hashed.toString('hex') });
			});
			hash.write(data);
			hash.end();
		});
	});

}