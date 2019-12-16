import Git from './git/git';



export async function setup(){
	global['Git'] = Git;
}



export async function unsetup(){
	delete global['Git'];
}