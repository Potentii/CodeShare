<template>
	<li class="v-commit-diff-panel-item">

		<div class="-file-header">

			<div class="-stage-container">
				<input class="-stage" type="checkbox" v-model="file_change.staged">
			</div>


			<span class="-content">

				<span class="-path --path">
					<span class="-dir">{{ file_change.dir }}/</span>
					<span class="-file-name">{{ file_change.file_name }}</span>
				</span>


				<span class="-short-diff">
					<span class="-ordinary" v-if="file_change.diff.type=='MODIFIED'">
						<span class="-added-lines">+100</span>
						<span class="-removed-lines">-100</span>
						<span class="-changed-lines">~100</span><!-- NOT SURE IF NEEDED -->
					</span>


					<span class="-renamed --path" v-else-if="file_change.diff.type=='RENAMED'">
						<span class="-dir">Renamed from {{ file_change.diff.dir }}/</span>
						<span class="-file-name">{{ file_change.diff.file_name }}</span>
					</span>


					<span class="-moved --path" v-else-if="file_change.diff.type=='MOVED'">
						<span class="-dir">Moved from {{ file_change.diff.dir }}/</span>
						<span class="-file-name">{{ file_change.diff.file_name }}</span>
					</span>


					<span class="-added" v-else-if="file_change.diff.type=='ADDED'">
						Added
					</span>


					<span class="-removed" v-else-if="file_change.diff.type=='REMOVED'">
						Removed
					</span>

					<span class="-unknown" v-else>
						Unknown modification
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
</template>



<script>
import Git        from '../@infra/git';
import ProjectVO  from './project-vo';
import FileChange from '@code-share/electron/git/file-change';



export default {

	name: 'v-commit-diff-panel-item',


	components: { },


	props: {
		/**
		 * @type {FileChange}
		 */
		file_change: {
			type: FileChange,
			required: true,
		},
	},


	data(){
		return {
		};
	},


	methods: {

		// /**
		//  *
		//  * @param {ProjectVO} project_vo
		//  * @returns {Promise<void>}
		//  */
		// async loadDiff(file_change){
		// 	if(!project_vo?.project?.details?.location){
		// 		// this.files = [];
		// 		return;
		// 	}
		//
		// 	// this.files = await new Git(project_vo?.project?.details?.location).log();
		// },

	},
}
</script>



<style>
.v-commit-diff-panel-item{
	display: flex;
	flex-direction: column;
	align-items: stretch;
	padding: 0.5em 0;
}
.v-commit-diff-panel-item > .-file-header{
	display: grid;
	align-items: center;
	grid-template-columns: calc(var(--diff-side-margins) * 2) auto 1fr calc(var(--diff-side-margins) * 2);
	grid-template-rows: auto;
	grid-template-areas:
		'stage content ... actions';
}
.v-commit-diff-panel-item > .-file-header > .-stage-container{
	grid-area: stage;
}
.v-commit-diff-panel-item > .-file-header > .-content{
	grid-area: content;
}
.v-commit-diff-panel-item > .-file-header > .-actions{
	grid-area: actions;
}

.v-commit-diff-panel-item > .-file-header > .-stage-container{
	display: flex;
	align-items: center;
	justify-content: center;
}
.v-commit-diff-panel-item > .-file-header > .-content{
	display: flex;
	flex-direction: column;
	align-items: stretch;
}
.v-commit-diff-panel-item > .-file-header > .-content > .-path{
	font-family: 'Roboto', sans-serif;
	font-size: 14px;
	padding-top: 1.1em;
}
.v-commit-diff-panel-item > .-file-header > .-content > .-short-diff{
	opacity: 0.4;
	font-family: 'Roboto', sans-serif;
	font-size: 11px;
	transition: opacity 0.15s ease;
}
.v-commit-diff-panel-item:hover > .-file-header > .-content > .-short-diff{
	opacity: 0.8;
}
.v-commit-diff-panel-item > .-file-header > .-content > .-path + .-short-diff{
	margin-top: 0.3em;
}

.v-commit-diff-panel-item .--path{
	display: inline-flex;
	align-items: center;
	letter-spacing: 0.06em;
}
.v-commit-diff-panel-item .--path > .-dir{
	cursor: default;
	user-select: text;
	opacity: 0.5;
	font-size: 0.9em;
}
.v-commit-diff-panel-item .--path > .-file-name{
	cursor: default;
	user-select: text;
	margin-left: 0.1em;
}

.v-commit-diff-panel-item > .-file-header > .-content > .-short-diff > .-ordinary{

}
.v-commit-diff-panel-item > .-file-header > .-content > .-short-diff > .-ordinary > span + span{
	margin-left: 0.8em;
}
.v-commit-diff-panel-item > .-file-header > .-content > .-short-diff > .-ordinary > .-added-lines{
	color: var(--m-green-a700);
}
.v-commit-diff-panel-item > .-file-header > .-content > .-short-diff > .-ordinary > .-removed-lines{
	color: var(--m-red-a700);
}
.v-commit-diff-panel-item > .-file-header > .-content > .-short-diff > .-ordinary > .-changed-lines{
	color: var(--m-light-blue-a400);
}

.v-commit-diff-panel-item > .-file-header > .-content > .-short-diff > .-renamed{

}
.v-commit-diff-panel-item > .-file-header > .-content > .-short-diff > .-moved{

}
.v-commit-diff-panel-item > .-file-header > .-content > .-short-diff > .-added{
	color: var(--m-green-a700);
}
.v-commit-diff-panel-item > .-file-header > .-content > .-short-diff > .-removed{
	color: var(--m-red-a700);
}


.v-commit-diff-panel-item > .-file-header > .-actions{
	display: flex;
	align-items: center;
	justify-content: center;
}


.v-commit-diff-panel-item > .-expanded{

}
</style>
