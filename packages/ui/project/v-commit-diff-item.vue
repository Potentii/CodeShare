<template>
	<li class="v-commit-diff-item" :data-type="file_change.event_type">

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
				<li class="-hunk --thin-scroll" v-for="(hunk, index) in file_change.hunks">
					<div class="-header">
						<div class="-stage-container">
							<input class="-stage" type="checkbox" v-model="hunk.staged">
						</div>
						<span class="-number">Hunk {{ index+1 }}</span>
						{{ hunk.a_range }}{{ hunk.b_range }}
					</div>
					<ul class="-lines">
						<li class="-line" :data-mode="line.mode" v-for="(line, line_index) in hunk.lines">
							<span class="-margins">
								<span class="-line-number-a">{{ hunk.a_range.start+line_index < hunk.a_range.size ? hunk.a_range.start+line_index : ' ' }}</span>
								<span class="-line-number-b">{{ hunk.b_range.start+line_index }}</span>
								<span class="-mode" v-if="line.mode=='ADDED'">+</span>
								<span class="-mode" v-else-if="line.mode=='REMOVED'">-</span>
								<span class="-mode" v-else>&nbsp;</span>
							</span>
							<span class="-content">{{ line.content }}</span>
						</li>
					</ul>
				</li>
			</ul>
		</div>

	</li>
</template>



<script>
import FileChange from '../git/file-change';



export default {

	name: 'v-commit-diff-item',


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

	},
}
</script>



<style>
.v-commit-diff-item{
	display: flex;
	flex-direction: column;
	align-items: stretch;
}
.v-commit-diff-item > .-file-header{
	display: grid;
	align-items: center;
	grid-template-columns: calc(var(--diff-side-margins) * 2) 1fr calc(var(--diff-side-margins) * 2);
	grid-template-rows: auto;
	grid-template-areas:
		'stage content actions';

	padding: 0.5em 0;
}
.v-commit-diff-item > .-file-header > .-stage-container{
	grid-area: stage;
}
.v-commit-diff-item > .-file-header > .-content{
	grid-area: content;
}
.v-commit-diff-item > .-file-header > .-actions{
	grid-area: actions;
}

.v-commit-diff-item > .-file-header{
	--diff-type-color: hsla(0, 0%, 0%, 0.1);
}
.v-commit-diff-item[data-type="ORDINARY"] > .-file-header{
	--diff-type-color: hsla(205, 80%, 50%, 0.1);
}
.v-commit-diff-item[data-type="REMOVED"] > .-file-header{
	--diff-type-color: hsla(350, 70%, 50%, 0.1);
}
.v-commit-diff-item[data-type="ADDED"] > .-file-header{
	--diff-type-color: hsla(130, 80%, 50%, 0.1);
}
.v-commit-diff-item[data-type="MOVED"] > .-file-header,
.v-commit-diff-item[data-type="RENAMED"] > .-file-header{
	--diff-type-color: hsla(0, 0%, 50%, 0.1);
}
.v-commit-diff-item[data-type] > .-file-header{
	background-image: linear-gradient(
		to right,
		var(--diff-type-color) 10%,
		transparent 60%
	);
}


.v-commit-diff-item > .-file-header > .-stage-container{
	display: flex;
	align-items: center;
	justify-content: center;
}
.v-commit-diff-item > .-file-header > .-content{
	display: flex;
	flex-direction: column;
	align-items: stretch;
}
.v-commit-diff-item > .-file-header > .-content > .-path{
	font-family: 'Roboto', sans-serif;
	font-size: 14px;
	padding-top: 1.1em;
}
.v-commit-diff-item > .-file-header > .-content > .-short-diff{
	opacity: 0.6;
	font-family: 'Roboto', sans-serif;
	font-size: 11px;
	transition: opacity 0.15s ease;
}
.v-commit-diff-item:hover > .-file-header > .-content > .-short-diff{
	opacity: 1;
}
.v-commit-diff-item > .-file-header > .-content > .-path + .-short-diff{
	margin-top: 0.3em;
}

.v-commit-diff-item .--path{
	user-select: text;
	display: inline-flex;
	align-items: center;
	letter-spacing: 0.06em;
}
.v-commit-diff-item .--path > .-dir{
	cursor: default;
	user-select: text;
	opacity: 0.5;
	font-size: 0.9em;
}
.v-commit-diff-item .--path > .-file-name{
	cursor: default;
	user-select: text;
	margin-left: 0.1em;
}

.v-commit-diff-item > .-file-header > .-content > .-short-diff > .-ordinary{
	color: var(--m-light-blue-a400);
}
.v-commit-diff-item > .-file-header > .-content > .-short-diff > .-renamed{

}
.v-commit-diff-item > .-file-header > .-content > .-short-diff > .-moved{

}
.v-commit-diff-item > .-file-header > .-content > .-short-diff > .-added{
	color: var(--m-green-a700);
}
.v-commit-diff-item > .-file-header > .-content > .-short-diff > .-removed{
	color: var(--m-red-a700);
}


.v-commit-diff-item > .-file-header > .-actions{
	display: flex;
	align-items: center;
	justify-content: center;
}


.v-commit-diff-item > .-expanded{
	display: flex;
	flex-direction: column;
	align-items: stretch;
}
.v-commit-diff-item > .-expanded::after{
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 1px;
	background-color: rgba(0,0,0,0.06);
}
.v-commit-diff-item > .-expanded > .-hunks{
	display: flex;
	flex-direction: column;
	align-items: stretch;
}
.v-commit-diff-item > .-expanded > .-hunks > .-hunk{
	display: flex;
	flex-direction: column;
	align-items: stretch;
	overflow-x: auto;
}
.v-commit-diff-item > .-expanded > .-hunks > .-hunk > .-header{
	display: flex;
	align-items: center;
	background-color: var(--m-grey-200);
	height: 1.8em;
}
.v-commit-diff-item > .-expanded > .-hunks > .-hunk > .-header::after{
	content: '';
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 1px;
	background-color: rgba(0,0,0,0.06);
}
.v-commit-diff-item > .-expanded > .-hunks > .-hunk > .-header > .-stage-container{
	flex: 0 0 auto;
	display: flex;
	align-items: center;
	justify-content: center;
	width: calc(var(--diff-side-margins) * 2);
}
.v-commit-diff-item > .-expanded > .-hunks > .-hunk > .-header > .-number{
	font-size: 12px;
}
.v-commit-diff-item > .-expanded > .-hunks > .-hunk > .-lines{
	display: flex;
	flex-direction: column;
	align-items: stretch;
	width: auto;
}
.v-commit-diff-item > .-expanded > .-hunks > .-hunk > .-lines > .-line{
	display: flex;
	align-items: stretch;
	height: 1.3em;
	font-family: 'Roboto Mono', monospace;
}
.v-commit-diff-item > .-expanded > .-hunks > .-hunk > .-lines > .-line{
	--line-mode-color: 200, 200, 200;
}
.v-commit-diff-item > .-expanded > .-hunks > .-hunk > .-lines > .-line[data-mode="ADDED"]{
	--line-mode-color: 0, 225, 80;
}
.v-commit-diff-item > .-expanded > .-hunks > .-hunk > .-lines > .-line[data-mode="REMOVED"]{
	--line-mode-color: 225, 0, 80;
}
.v-commit-diff-item > .-expanded > .-hunks > .-hunk > .-lines > .-line > .-margins{
	flex: 0 0 auto;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 10px;
	background-color: rgba(var(--line-mode-color), 0.15);
	padding: 0.8em;
}
.v-commit-diff-item > .-expanded > .-hunks > .-hunk > .-lines > .-line > .-margins::after{
	content: '';
	position: absolute;
	top: 0;
	right: 0;
	width: 1px;
	height: 100%;
	background-color: rgba(var(--line-mode-color), 0.17);
}
.v-commit-diff-item > .-expanded > .-hunks > .-hunk > .-lines > .-line > .-margins > .-line-number-a{
	margin-right: 0.5em;
}
.v-commit-diff-item > .-expanded > .-hunks > .-hunk > .-lines > .-line > .-margins > .-line-number-b{
	margin-right: 1em;
}
.v-commit-diff-item > .-expanded > .-hunks > .-hunk > .-lines > .-line > .-margins > .-line-number-a,
.v-commit-diff-item > .-expanded > .-hunks > .-hunk > .-lines > .-line > .-margins > .-line-number-b{
	display: flex;
	align-items: center;
	justify-content: center;
	opacity: 0.4;
	width: 1.3em;
}

.v-commit-diff-item > .-expanded > .-hunks > .-hunk > .-lines > .-line > .-content{
	user-select: text;
	flex: 1 1 auto;
	display: inline-flex;
	align-items: center;
	white-space: pre;
	font-size: 12px;
	padding: 0 0.5em;
	background-color: rgba(var(--line-mode-color), 0.07);
}
</style>
