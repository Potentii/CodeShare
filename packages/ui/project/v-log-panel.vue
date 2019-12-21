<template>
	<div class="v-log-panel">

		<ul class="-commits">
			<template v-for="commit in commits">

				<li class="-commit --head" v-if="commit.hash == head">
					<div class="-hist">
						<div class="-dot"></div>
					</div>
					<form class="-form">
						<textarea class="-input --thin-scroll" v-model="new_commit.message" placeholder="New commit message" rows="3"></textarea>
						<div class="-actions">
							<button class="-action -commit-n-push" type="button" v-if="remotes && remotes.some(r => r.type == 'push')">
								<span class="-label">Commit & Push</span>
							</button>
							<button class="-action -commit" type="button">
								<span class="-label">Commit</span>
							</button>
						</div>
					</form>
				</li>

				<li class="-commit" :key="commit.hash">
					<div class="-hist">
						<div class="-dot"></div>
					</div>
					<div class="-message" >
						<span class="-hash" :title="commit.hash">{{ commit.short_hash }}</span>
						<span class="-text" :title="commit.message">{{ commit.message }}</span>
					</div>
					<span class="-author" v-if="commit.author">
						<v-gravatar-picture class="-thumb" :size="25" :email="commit.author.email"></v-gravatar-picture>
						<div class="-person">
							<span class="-email" :title="commit.author.email">{{ commit.author.email }}</span>
							<span class="-name" :title="commit.author.name">{{ commit.author.name }}</span>
							<span class="-date" :title="commit.author.date">On {{ commit.author.date.toLocaleDateString() }} at {{ commit.author.date.toLocaleTimeString() }}</span>
						</div>
					</span>
				</li>

			</template>
		</ul>

	</div>
</template>



<script>
import Git              from '../git/git';
import VGravatarPicture from '../@components/v-gravatar-picture';
import ProjectVO        from './project-vo';



export default {

	name: 'v-log-panel',


	components: { VGravatarPicture },


	props: {
		/**
		 * @type {ProjectVO}
		 */
		project_vo: {
			type: ProjectVO,
			required: true,
		}
	},


	data(){
		return {
			/**
			 * @type {Commit[]}
			 */
			commits: [],
			head: null,
			remotes: [],
			new_commit: {
				message: ''
			}
		};
	},


	async beforeMount(){
		await Promise.all([
			this.loadCommits(this.project_vo),
			this.loadHEAD(this.project_vo),
			this.loadRemotes(this.project_vo),
		]);
	},


	methods: {

		/**
		 *
		 * @param {ProjectVO} project_vo
		 * @returns {Promise<void>}
		 */
		async loadCommits(project_vo){
			if(!project_vo?.project?.details?.location){
				this.commits = [];
				return;
			}

			this.commits = await new Git(project_vo?.project?.details?.location).log();
		},


		async loadHEAD(project_vo){
			if(!project_vo?.project?.details?.location){
				this.head = null;
				return;
			}

			const head_ref = await new Git(project_vo?.project?.details?.location).getHEADReference();
			this.head = head_ref.hash;
		},


		async loadRemotes(project_vo){
			if(!project_vo?.project?.details?.location){
				this.remotes = null;
				return;
			}

			this.remotes = await new Git(project_vo?.project?.details?.location).remote.getAll();
		},

	},
}
</script>



<style>
.v-log-panel{
	display: flex;
	flex-direction: column;
	align-items: stretch;
}

.v-log-panel > .-commits{
	display: flex;
	flex-direction: column;
	align-items: stretch;

	background-color: var(--m-grey-50);

	border-radius: 8px;
	box-shadow: 0 3px 6px -1px rgba(0,0,0,0.15);
}
.v-log-panel > .-commits > .-commit{
	--commit-side-margins: 2em;
	display: grid;
	align-items: center;

	padding: 0.8em 0;
	grid-template-columns: calc(var(--commit-side-margins) * 2) auto 1fr minmax(auto, 12em);
	grid-template-rows: auto;
	grid-template-areas:
		'hist message ... author';

	overflow: hidden;
}
.v-log-panel > .-commits > .-commit.--head{
	grid-template-columns: calc(var(--commit-side-margins) * 2) 1fr;
	grid-template-areas:
		'hist form';
}
.v-log-panel > .-commits > .-commit + .-commit::before{
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 1px;
	background-color: rgba(0,0,0,0.06);
}
.v-log-panel > .-commits > .-commit > .-hist{
	grid-area: hist;
}
.v-log-panel > .-commits > .-commit > .-message{
	grid-area: message;
}
.v-log-panel > .-commits > .-commit > .-author{
	grid-area: author;
}
.v-log-panel > .-commits > .-commit > .-form{
	grid-area: form;
}


.v-log-panel > .-commits > .-commit > .-hist{
	display: flex;
	justify-content: center;
}
.v-log-panel > .-commits > .-commit > .-hist > .-dot{
	--dot-size: 9px;
	width: var(--dot-size);
	height: var(--dot-size);
	background-color: rgba(101, 31, 255, 1);
	border-radius: 50%;
	box-shadow: 0 0 10px 3px rgba(101, 31, 255, 0.3);
}


.v-log-panel > .-commits > .-commit > .-message{
	cursor: default;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	padding-right: calc(var(--commit-side-margins) / 2);
}
.v-log-panel > .-commits > .-commit > .-message > .-hash{
	user-select: text;
	opacity: 0;
	font-size: 10px;
	color: var(--m-grey-500);
	margin-bottom: 0.3em;
	transition: opacity 0.15s ease;
}
.v-log-panel > .-commits > .-commit:hover > .-message > .-hash{
	opacity: 1;
}
.v-log-panel > .-commits > .-commit > .-message > .-text{
	user-select: text;
	display: block;
	font-size: 14px;
	padding-bottom: 1.2em;

	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
}

.v-log-panel > .-commits > .-commit > .-author{
	cursor: default;
	display: flex;
	align-items: center;
	overflow: hidden;
	padding-right: var(--commit-side-margins);
}
.v-log-panel > .-commits > .-commit > .-author > .-thumb{
	flex: 1 0 auto;
	--thumb-size: 25px;
	background-color: var(--m-grey-500);
	width: var(--thumb-size);
	height: var(--thumb-size);
	border-radius: 50%;
	margin-right: 1em;
	overflow: hidden;
}
.v-log-panel > .-commits > .-commit > .-author > .-thumb > img{
	object-fit: cover;
}
.v-log-panel > .-commits > .-commit > .-author > .-person{
	flex: 1 1 auto;
	display: flex;
	flex-direction: column;
	justify-content: center;
	overflow: hidden;
}
.v-log-panel > .-commits > .-commit > .-author > .-person > .-email{
	user-select: text;
	opacity: 0;
	display: inline-block;
	font-size: 9px;
	color: var(--m-grey-500);
	margin-bottom: 0.3em;

	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;

	transition: opacity 0.15s ease;
}
.v-log-panel > .-commits > .-commit:hover > .-author > .-person > .-email{
	opacity: 1;
}
.v-log-panel > .-commits > .-commit > .-author > .-person > .-name{
	user-select: text;
	display: inline-block;
	font-size: 12px;
	color: var(--m-grey-800);

	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
}
.v-log-panel > .-commits > .-commit > .-author > .-person > .-date{
	user-select: text;
	display: inline-block;
	font-size: 9px;
	color: var(--m-grey-500);
	margin-top: 0.3em;

	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
}


.v-log-panel > .-commits > .-commit > .-form{
	display: flex;
	padding-right: var(--commit-side-margins);
}
.v-log-panel > .-commits > .-commit > .-form > .-input{
	flex: 1 1 auto;

	padding: 0.8em 1em;
	margin-right: calc(var(--commit-side-margins) / 2);

	resize: none;

	border: 1px solid rgba(0,0,0,0.06);
	border-radius: 8px;

	font-size: 14px;
	font-family: 'Roboto', sans-serif;
	letter-spacing: 0.03em;

	transition: border-color 0.15s ease;
}
.v-log-panel > .-commits > .-commit > .-form > .-input:focus{
	border-color: rgba(0,0,0,0.13);
}
.v-log-panel > .-commits > .-commit > .-form > .-actions{
	display: flex;
	flex-direction: column;
	width: 6em;
}
.v-log-panel > .-commits > .-commit > .-form > .-actions > .-action{
	padding: 0.6em 0.8em;
	background-color: var(--m-grey-300);
	border-radius: 4px;
}
.v-log-panel > .-commits > .-commit > .-form > .-actions > .-action + .-action{
	margin-top: 0.8em;
}
.v-log-panel > .-commits > .-commit > .-form > .-actions > .-action > .-label{
	font-size: 12px;
	letter-spacing: 0.03em;
}


</style>
