<template>
	<li class="v-commit-diff-panel-item" :data-type="file_change.event_type">

		<div class="-file-header">

			<div class="-stage-container">
				<input class="-stage" type="checkbox" v-model="file_change.staged">
			</div>


			<span class="-content">

				<span class="-path --path" :title="file_change.old_path" v-if="file_change.event_type=='REMOVED'">
					<span class="-dir">{{ file_change.old_dir=='.'?'':file_change.old_dir+'/' }}</span>
					<span class="-file-name">{{ file_change.old_file_name }}</span>
				</span>
				<span class="-path --path" :title="file_change.path" v-else>
					<span class="-dir">{{ file_change.dir=='.'?'':file_change.dir+'/' }}</span>
					<span class="-file-name">{{ file_change.file_name }}</span>
				</span>


				<span class="-short-diff">
					<span class="-ordinary" v-if="file_change.event_type=='ORDINARY'">
<!--						<span class="-added-lines">+100</span>-->
<!--						<span class="-removed-lines">-100</span>-->
<!--						<span class="-changed-lines">~100</span>&lt;!&ndash; NOT SURE IF NEEDED &ndash;&gt;-->
						Modified
					</span>


					<span class="-renamed --path" v-else-if="file_change.event_type=='RENAMED'" :title="file_change.old_path">
						<span class="-dir">Renamed from {{ file_change.old_dir=='.'?'':file_change.old_dir+'/' }}</span>
						<span class="-file-name">{{ file_change.old_file_name }}</span>
					</span>


<!--					<span class="-moved &#45;&#45;path" v-else-if="file_change.event_type=='MOVED'" :title="file_change.diff.path">-->
<!--						<span class="-dir">Moved from {{ file_change.diff.dir=='.'?'':file_change.diff.dir+'/' }}</span>-->
<!--						<span class="-file-name">{{ file_change.diff.file_name }}</span>-->
<!--					</span>-->


					<span class="-added" v-else-if="file_change.event_type=='ADDED'">
						Created
					</span>


					<span class="-removed" v-else-if="file_change.event_type=='REMOVED'">
						Removed
					</span>

					<span class="-unknown" v-else>
						Unknown modification
					</span>

				</span>

			</span>

			<div class="-actions">
				<button class="-action -expand" type="button" @click="expanded=!expanded">
					<i class="-icon material-icons">{{ expanded?'arrow_drop_up':'arrow_drop_down' }}</i>
				</button>
			</div>


		</div>

		<div class="-expanded" v-if="expanded">
			<ul class="-hunks">
				<li class="-hunk --thin-scroll" v-for="hunk in file_change.hunks">
					<ul class="-lines">
						<li class="-line" :data-mode="line.mode" v-for="line in hunk.lines">
							<span class="-mode" v-if="line.mode=='ADDED'">+</span>
							<span class="-mode" v-else-if="line.mode=='REMOVED'">-</span>
							<span class="-mode" v-else>&nbsp;</span>
							<span class="-content">{{ line.content }}</span>
						</li>
					</ul>
				</li>
			</ul>
		</div>

	</li>
</template>



<script>
import Git        from '../git/git';
import ProjectVO  from './project-vo';
import FileChange from '../git/file-change';



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
			expanded: true,
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
}
.v-commit-diff-panel-item > .-file-header{
	display: grid;
	align-items: center;
	grid-template-columns: calc(var(--diff-side-margins) * 2) auto 1fr calc(var(--diff-side-margins) * 2);
	grid-template-rows: auto;
	grid-template-areas:
		'stage content ... actions';

	padding: 0.5em 0;
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

.v-commit-diff-panel-item > .-file-header{
	--diff-type-color: hsla(0, 0%, 0%, 0.1);
}
.v-commit-diff-panel-item[data-type="ORDINARY"] > .-file-header{
	--diff-type-color: hsla(205, 80%, 50%, 0.1);
}
.v-commit-diff-panel-item[data-type="REMOVED"] > .-file-header{
	--diff-type-color: hsla(350, 70%, 50%, 0.1);
}
.v-commit-diff-panel-item[data-type="ADDED"] > .-file-header{
	--diff-type-color: hsla(130, 80%, 50%, 0.1);
}
.v-commit-diff-panel-item[data-type="MOVED"] > .-file-header,
.v-commit-diff-panel-item[data-type="RENAMED"] > .-file-header{
	--diff-type-color: hsla(0, 0%, 50%, 0.1);
}
.v-commit-diff-panel-item[data-type] > .-file-header{
	background-image: linear-gradient(
		to right,
		var(--diff-type-color) 10%,
		transparent 60%
	);
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
	opacity: 0.6;
	font-family: 'Roboto', sans-serif;
	font-size: 11px;
	transition: opacity 0.15s ease;
}
.v-commit-diff-panel-item:hover > .-file-header > .-content > .-short-diff{
	opacity: 1;
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
	color: var(--m-light-blue-a400);
}
/*.v-commit-diff-panel-item > .-file-header > .-content > .-short-diff > .-ordinary > span + span{*/
/*	margin-left: 0.8em;*/
/*}*/
/*.v-commit-diff-panel-item > .-file-header > .-content > .-short-diff > .-ordinary > .-added-lines{*/
/*	color: var(--m-green-a700);*/
/*}*/
/*.v-commit-diff-panel-item > .-file-header > .-content > .-short-diff > .-ordinary > .-removed-lines{*/
/*	color: var(--m-red-a700);*/
/*}*/
/*.v-commit-diff-panel-item > .-file-header > .-content > .-short-diff > .-ordinary > .-changed-lines{*/
/*	color: var(--m-light-blue-a400);*/
/*}*/

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
	display: flex;
	flex-direction: column;
	align-items: stretch;
}
.v-commit-diff-panel-item > .-expanded > .-hunks{
	display: flex;
	flex-direction: column;
	align-items: stretch;
}
.v-commit-diff-panel-item > .-expanded > .-hunks > .-hunk{
	display: flex;
	flex-direction: column;
	align-items: stretch;
	overflow-x: auto;
}
.v-commit-diff-panel-item > .-expanded > .-hunks > .-hunk > .-lines{
	display: flex;
	flex-direction: column;
	align-items: stretch;
	width: auto;
}
.v-commit-diff-panel-item > .-expanded > .-hunks > .-hunk > .-lines > .-line{
	display: flex;
	align-items: stretch;
	height: 1.3em;
	font-family: 'Roboto Mono', monospace;
}
.v-commit-diff-panel-item > .-expanded > .-hunks > .-hunk > .-lines > .-line{
	--line-mode-color: 180, 180, 180;
}
.v-commit-diff-panel-item > .-expanded > .-hunks > .-hunk > .-lines > .-line[data-mode="ADDED"]{
	--line-mode-color: 0, 225, 80;
}
.v-commit-diff-panel-item > .-expanded > .-hunks > .-hunk > .-lines > .-line[data-mode="REMOVED"]{
	--line-mode-color: 225, 0, 80;
}
.v-commit-diff-panel-item > .-expanded > .-hunks > .-hunk > .-lines > .-line > .-mode{
	flex: 0 0 auto;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 2em;
	font-size: 10px;

	background-color: rgba(var(--line-mode-color), 0.15);
}
.v-commit-diff-panel-item > .-expanded > .-hunks > .-hunk > .-lines > .-line > .-mode::after{
	content: '';
	position: absolute;
	top: 0;
	right: 0;
	width: 1px;
	height: 100%;
	/*background-color: var(--m-grey-200);*/
	background-color: rgba(var(--line-mode-color), 0.17);
}
.v-commit-diff-panel-item > .-expanded > .-hunks > .-hunk > .-lines > .-line > .-content{
	user-select: text;
	flex: 1 1 auto;
	display: inline-flex;
	align-items: center;
	white-space: pre;
	font-size: 12px;
	padding: 0 0.5em;
	background-color: rgba(var(--line-mode-color), 0.08);
	/*height: 1.3rem;*/
}
</style>
