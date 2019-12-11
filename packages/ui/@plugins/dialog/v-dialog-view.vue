<template>
   <div
      class="v-dialog-view"
      :class="{
         '--max-height': dialog.options && dialog.options.max_height,
      }">

      <div class="-overlay" @click="dialog.dismiss()"></div>

      <transition name="dialog-window" :duration="{ enter: 300, leave: 300 }" appear>
         <div class="-window">
            <component :is="dialog.component" v-bind="dialog.input ? dialog.input : {}"></component>
         </div>
      </transition>

   </div>
</template>



<script>
import Dialog from './dialog';



export default{

   name:'v-dialog-view',


	props: {
		/**
		 * @type {Dialog}
		 */
		'dialog': {
			type: Dialog,
			required: true
		}
	},


   beforeCreate(){
   	// TODO refactor this part, maybe it's a bit unsafe to get the properties from the '$options.propsData'
		this._dialog = this.$options.propsData.dialog;
	}

}
</script>



<style>
.v-dialog-view{
   position: absolute;

   display: flex;
   align-items: flex-end;
   /*justify-content: center;*/

   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
}

.v-dialog-view > .-overlay{
   position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;

   background-color: rgba(0,0,0,0.3);
}

.v-dialog-view > .-window{
   --var-dialog-window-bg: var(--m-grey-800);

   display: flex;
   width: 100%;
   max-height: 100%;
   background-color: var(--var-dialog-window-bg);
}

.v-dialog-view.--max-height > .-window{
   height: 100%;
}
.v-dialog-view:not(.--max-height) > .-window{
   --var-dialog-window-head-size: 14px;
   border-top-left-radius: var(--var-dialog-window-head-size);
   border-top-right-radius: var(--var-dialog-window-head-size);
}
/*.v-dialog-view:not(.--max-height) > .-window::before{*/
/*   --var-dialog-window-head-size: 26px;*/
/*   content: '';*/
/*   position: absolute;*/
/*   top: calc(var(--var-dialog-window-head-size) * -1);*/
/*   left: 0;*/
/*   width: 100%;*/
/*   height: var(--var-dialog-window-head-size);*/

/*   border-top-left-radius: var(--var-dialog-window-head-size);*/
/*   border-top-right-radius: var(--var-dialog-window-head-size);*/

/*   background-color: var(--var-dialog-window-bg);*/

/*   box-shadow: 0 -10px 15px -2px rgba(0,0,0,0.3);*/
/*}*/

.v-dialog-view > .-window.dialog-window-enter-active{
   animation-name: dialog-window-fade-in;
   animation-duration: 0.3s;
   animation-timing-function: ease;
   animation-fill-mode: both;
}
.v-dialog-display.dialog-display-leave-active .v-dialog-view > .-window,
.v-dialog-view > .-window.dialog-window-leave-active{
   animation-name: dialog-window-fade-out;
   animation-duration: 0.3s;
   animation-timing-function: ease;
   animation-fill-mode: both;
}
@keyframes dialog-window-fade-in{
   from{
      opacity: 0;
      transform: translateY(3em);
   }
}
@keyframes dialog-window-fade-out{
   to{
      opacity: 0;
      transform: translateY(3em);
   }
}
</style>
