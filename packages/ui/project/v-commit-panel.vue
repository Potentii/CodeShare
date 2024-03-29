<template>
	<div class="v-commit-panel">

		<div class="-header">

			<div class="-loading" v-if="$states.is('loading')">
				<v-loading-spinner class="-spinner"></v-loading-spinner>
			</div>


			<div class="-empty" v-if="!$states.is('loading') && files && !files.length">
				<span class="-no files">No files changed</span>
			</div>


			<div class="-commit-summary" v-if="!$states.is('loading') && files && files.length">
				<span class="-staged">{{ count_unstaged==0&&count_staged>0?'All ':'' }}<span class="-qty">{{ count_staged }}</span> file{{ count_staged==1?'':'s' }} on commit</span>
				<span class="-unstaged" v-if="count_unstaged > 0">{{ count_staged==0&&count_unstaged>0?'All ':'' }}<span class="-qty">{{ count_unstaged }}</span> file{{ count_unstaged==1?'':'s' }} unmarked</span>
			</div>

		</div>

		<v-new-commit-form class="-new-commit" v-if="!$states.is('loading') && files && files.length" :project_vo="project_vo"></v-new-commit-form>

		<ul class="-files" v-if="!$states.is('loading') && files && files.length">
			<v-commit-diff-item class="-file" :file_change="file" :key="file.path" v-for="file in files_sorted"></v-commit-diff-item>
		</ul>

	</div>
</template>



<script>
import Git             from '../git/git';
import ProjectVO       from './project-vo';
import VCommitDiffItem from './v-commit-diff-item';
import FileChange      from '../git/file-change';
import VNewCommitForm  from './v-new-commit-form';
import VLoadingSpinner from '../@components/v-loading-spinner';



export default {

	name: 'v-commit-panel',


	components: { VLoadingSpinner, VNewCommitForm, VCommitDiffItem },


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
			 * @type {FileChange[]}
			 */
			files: [],
		};
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


	watch: {
		project_vo: {
			async handler(project_vo){
				await this.load(project_vo);
			},
			immediate: true
		}
	},


	methods: {

		async load(project_vo){
			this.$states.add('loading');
			try{

				await Promise.all([
					this.loadFiles(project_vo),
				]);

			} catch(err){
				console.error(err);
			} finally{
				this.$states.remove('loading');
			}
		},


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

			this.files = await new Git(this.project_vo?.project?.details?.location).diff({ include_added_unstaged: true });
			this.files = this.sort(this.files);
		},


		sort(files){
			return files.sort((a,b) => {
				const path_a = a.path || a.old_path;
				const path_b = b.path || b.old_path;
				path_a.localeCompare(path_b);
			});
		},

	},
}
</script>



<style>
.v-commit-panel{
	--diff-side-margins: 1.7rem;
	display: flex;
	flex-direction: column;
	align-items: stretch;

	height: max-content;

	background-color: var(--m-grey-50);

	border-radius: 8px;
	box-shadow: 0 3px 6px -1px rgba(0,0,0,0.15);
}
.v-commit-panel > .-header{
	padding: 1em calc(var(--diff-side-margins) - 4px);
}

.v-commit-panel > .-header > .-loading{
	--v-loading-spinner--size: 3em;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 3em 0;
}

.v-commit-panel > .-header > .-empty{
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 3em 0;
	font-size: 14px;
}

.v-commit-panel > .-header > .-commit-summary{
	display: flex;
	flex-direction: column;
}
.v-commit-panel > .-header > .-commit-summary > .-staged{
	font-size: 14px;
}
.v-commit-panel > .-header > .-commit-summary > .-unstaged{
	opacity: 0.7;
	font-size: 12px;
}
.v-commit-panel > .-header > .-commit-summary > .-staged + .-unstaged{
	margin-top: 0.4em;
}
.v-commit-panel > .-header > .-commit-summary > .-staged > .-qty,
.v-commit-panel > .-header > .-commit-summary > .-unstaged > .-qty{
	font-family: 'Roboto Medium', sans-serif;
}

.v-commit-panel > .-files{
	display: flex;
	flex-direction: column;
	align-items: stretch;
}
.v-commit-panel > .-files > .-file::before{
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 1px;
	background-color: rgba(0,0,0,0.06);
}
</style>
