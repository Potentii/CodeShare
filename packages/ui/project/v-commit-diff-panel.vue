<template>
	<div class="v-commit-diff-panel">

		<div class="-header">
			<div class="-commit-summary">
				<span class="-staged">{{ count_unstaged==0&&count_staged>0?'All ':'' }}<span class="-qty">{{ count_staged }}</span> file{{ count_staged==1?'':'s' }} on commit</span>
				<span class="-unstaged" v-if="count_unstaged > 0">{{ count_staged==0&&count_unstaged>0?'All ':'' }}<span class="-qty">{{ count_unstaged }}</span> file{{ count_unstaged==1?'':'s' }} unmarked</span>
			</div>
		</div>

		<ul class="-files">
			<v-commit-diff-panel-item class="-file" :file_change="file" :key="file.path" v-for="file in files_sorted"></v-commit-diff-panel-item>
		</ul>

	</div>
</template>



<script>
import Git                  from '../git/git';
import ProjectVO            from './project-vo';
import VCommitDiffPanelItem from './v-commit-diff-panel-item';
import FileChange           from '../git/file-change';



export default {

	name: 'v-commit-diff-panel',


	components: { VCommitDiffPanelItem },


	props: {
		/**
		 * @type {ProjectVO}
		 */
		project_vo: {
			type: ProjectVO,
			required: true,
		}
	},


	computed: {
		count_staged(){
			return this.files ? this.files.filter(f => f.staged === true).length : 0;
		},

		count_unstaged(){
			return this.files ? this.files.filter(f => f.staged === false).length : 0;
		},

		files_sorted(){
			return this.files;
			// return [...this.files].sort((f, f2) => f.staged?-1:1);
		}
	},


	data(){
		return {
			/**
			 * @type {FileChange[]}
			 */
			files: [],
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
				this.files = [];
				return;
			}

			// this.files = await new Git(this.project_vo?.project?.details?.location).getWorkingTreeFilesChange();
			// this.files = this.sort(this.files);

			this.files = await new Git(this.project_vo?.project?.details?.location).diff({ include_added_unstaged: true });
			this.files = this.sort(this.files);
			// console.log(this.diffs.map(d => d.header));
			// console.log(this.files.map(f => f.path));
		},


		sort(files){
			return files.sort((a,b) => {
				const path_a = a.path || a.old_path;
				const path_b = b.path || b.old_path;
				path_a.localeCompare(path_b);
			});
		}

	},
}
</script>



<style>
.v-commit-diff-panel{
	--diff-side-margins: 1.7rem;
	display: flex;
	flex-direction: column;
	align-items: stretch;

	height: max-content;

	background-color: var(--m-grey-50);

	border-radius: 8px;
	box-shadow: 0 3px 6px -1px rgba(0,0,0,0.15);
}
.v-commit-diff-panel > .-header{
	padding: 1em calc(var(--diff-side-margins) - 4px);
}
.v-commit-diff-panel > .-header > .-commit-summary{
	display: flex;
	flex-direction: column;
}
.v-commit-diff-panel > .-header > .-commit-summary > .-staged{
	font-size: 14px;
}
.v-commit-diff-panel > .-header > .-commit-summary > .-unstaged{
	opacity: 0.7;
	font-size: 12px;
}
.v-commit-diff-panel > .-header > .-commit-summary > .-staged + .-unstaged{
	margin-top: 0.4em;
}
.v-commit-diff-panel > .-header > .-commit-summary > .-staged > .-qty,
.v-commit-diff-panel > .-header > .-commit-summary > .-unstaged > .-qty{
	font-family: 'Roboto Medium', sans-serif;
}

.v-commit-diff-panel > .-files{
	display: flex;
	flex-direction: column;
	align-items: stretch;
}
.v-commit-diff-panel > .-files > .-file::before{
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 1px;
	background-color: rgba(0,0,0,0.06);
}
</style>
