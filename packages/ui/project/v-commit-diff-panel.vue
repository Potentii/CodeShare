<template>
	<div class="v-commit-diff-panel">

		<div class="-header">
			<span class="-all">2 files to be committed</span>
			<span class="-untracked" v-if="false">2 files are untracked</span>
			<span class="-unstaged" v-if="false">2 files are unstaged</span>
		</div>

		<ul class="-files">

			<li class="-file" :key="file.path" v-for="file in files">

				<div class="-file-header">

					<div class="-track-container">
						<input class="-track" type="checkbox" v-model="file.tracked">
					</div>


					<span class="-content">

						<span class="-path --path">
							<span class="-dir">/path/to/my/</span>
							<span class="-file-name">file.html</span>
						</span>


						<span class="-short-diff">
							<span class="-ordinary" v-if="true">
								<span class="-added-lines">+100</span>
								<span class="-removed-lines">-100</span>
								<span class="-changed-lines">~100</span><!-- NOT SURE IF NEEDED -->
							</span>


							<span class="-renamed --path" v-if="false">
								<span class="-dir">Renamed from /path/to/my/</span>
								<span class="-file-name">file2.html</span>
							</span>


							<span class="-moved --path" v-if="false">
								<span class="-dir">Moved from /other/path/to/my/</span>
								<span class="-file-name">file.html</span>
							</span>


							<span class="-added" v-if="false">
								Added
							</span>


							<span class="-removed" v-if="false">
								Removed
							</span>

						</span>

					</span>

					<div class="-actions">
						<button class="-action -expand" type="button">
							<i class="-icon material-icons">arrow_drop_down</i>
						</button>
					</div>


				</div>


				<div class="-expanded">

				</div>

			</li>
		</ul>
	</div>
</template>



<script>
import Git       from '../@infra/git';
import ProjectVO from './project-vo';



export default {

	name: 'v-commit-diff-panel',


	components: { },


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
			files: [
				{
					path: '/path/to/my/code.txt',
					type: 'MODIFIED',
					tracked: true,
					get path_dir(){
						return '/path/to/my/'
					},
					get file_name(){
						return 'code.txt'
					}
				},
				{
					path: '/path/to/my/file.txt',
					type: 'REMOVED',
					tracked: true,
					get path_dir(){
						return '/path/to/my/'
					},
					get file_name(){
						return 'file.txt'
					}
				}
			]
		};
	},


	async beforeMount(){
		await Promise.all([
			this.loadFiles(this.project_vo),
		]);
	},


	methods: {

		/**
		 *
		 * @param {ProjectVO} project_vo
		 * @returns {Promise<void>}
		 */
		async loadFiles(project_vo){
			if(!project_vo?.project?.details?.location){
				// this.files = [];
				return;
			}

			// this.files = await new Git(project_vo?.project?.details?.location).log();
		},

	},
}
</script>



<style>
.v-commit-diff-panel{
	display: flex;
	flex-direction: column;
	align-items: stretch;

	height: max-content;

	background-color: var(--m-grey-50);

	border-radius: 8px;
	box-shadow: 0 3px 6px -1px rgba(0,0,0,0.15);
}
.v-commit-diff-panel > .-files{
	display: flex;
	flex-direction: column;
	align-items: stretch;
}
.v-commit-diff-panel > .-files > .-file{
	display: flex;
	flex-direction: column;
	align-items: stretch;
	padding: 0.5em 0;
}
.v-commit-diff-panel > .-files > .-file + .-file::before{
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 1px;
	background-color: rgba(0,0,0,0.06);
}
.v-commit-diff-panel > .-files > .-file > .-file-header{
	display: grid;
	align-items: center;
	grid-template-columns: 56px auto 1fr 56px;
	grid-template-rows: auto;
	grid-template-areas:
		'track content ... actions';
}
.v-commit-diff-panel > .-files > .-file > .-file-header > .-track-container{
	grid-area: track;
}
.v-commit-diff-panel > .-files > .-file > .-file-header > .-content{
	grid-area: content;
}
.v-commit-diff-panel > .-files > .-file > .-file-header > .-actions{
	grid-area: actions;
}

.v-commit-diff-panel > .-files > .-file > .-file-header > .-track-container{
	display: flex;
	align-items: center;
	justify-content: center;
}
.v-commit-diff-panel > .-files > .-file > .-file-header > .-content{
	display: flex;
	flex-direction: column;
	align-items: stretch;
}
.v-commit-diff-panel > .-files > .-file > .-file-header > .-content > .-path{
	font-family: 'Roboto', sans-serif;
	font-size: 14px;
	padding-top: 1.1em;
}
.v-commit-diff-panel > .-files > .-file > .-file-header > .-content > .-short-diff{
	opacity: 0.4;
	font-family: 'Roboto', sans-serif;
	font-size: 11px;
	transition: opacity 0.15s ease;
}
.v-commit-diff-panel > .-files > .-file:hover > .-file-header > .-content > .-short-diff{
	opacity: 0.8;
}
.v-commit-diff-panel > .-files > .-file > .-file-header > .-content > .-path + .-short-diff{
	margin-top: 0.3em;
}

.v-commit-diff-panel .--path{
	display: inline-flex;
	align-items: center;
	letter-spacing: 0.06em;
}
.v-commit-diff-panel .--path > .-dir{
	cursor: default;
	user-select: text;
	opacity: 0.5;
	font-size: 0.9em;
}
.v-commit-diff-panel .--path > .-file-name{
	cursor: default;
	user-select: text;
	margin-left: 0.1em;
}

.v-commit-diff-panel > .-files > .-file > .-file-header > .-content > .-short-diff > .-ordinary{

}
.v-commit-diff-panel > .-files > .-file > .-file-header > .-content > .-short-diff > .-ordinary > span + span{
	margin-left: 0.8em;
}
.v-commit-diff-panel > .-files > .-file > .-file-header > .-content > .-short-diff > .-ordinary > .-added-lines{
	color: var(--m-green-a700);
}
.v-commit-diff-panel > .-files > .-file > .-file-header > .-content > .-short-diff > .-ordinary > .-removed-lines{
	color: var(--m-red-a700);
}
.v-commit-diff-panel > .-files > .-file > .-file-header > .-content > .-short-diff > .-ordinary > .-changed-lines{
	color: var(--m-light-blue-a400);
}

.v-commit-diff-panel > .-files > .-file > .-file-header > .-content > .-short-diff > .-renamed{

}
.v-commit-diff-panel > .-files > .-file > .-file-header > .-content > .-short-diff > .-moved{

}
.v-commit-diff-panel > .-files > .-file > .-file-header > .-content > .-short-diff > .-added{
	color: var(--m-green-a700);
}
.v-commit-diff-panel > .-files > .-file > .-file-header > .-content > .-short-diff > .-removed{
	color: var(--m-red-a700);
}


.v-commit-diff-panel > .-files > .-file > .-file-header > .-actions{
	display: flex;
	align-items: center;
	justify-content: center;
}


.v-commit-diff-panel > .-files > .-file > .-expanded{

}
</style>
