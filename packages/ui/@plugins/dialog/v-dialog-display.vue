<template>
   <transition name="dialog-display" :duration="{ enter: 300, leave: 300 }" appear mode="out-in">
      <div class="v-dialog-display" v-if="dialogs && dialogs.length">
         <transition-group name="dialog" :duration="{ enter: 300, leave: 300 }" tag="ul" class="-dialogs">
            <v-dialog-view class="-dialog" :dialog="dialog" :key="dialog.id" :style="{ 'z-index': index }" v-for="(dialog, index) in dialogs"></v-dialog-view>
         </transition-group>
      </div>
   </transition>
</template>



<script>
import events      from './dialog-events';
import Dialog      from './dialog';
import VDialogView from './v-dialog-view';



export default{

   name:'v-dialog-display',


	components: { VDialogView },


	data(){
      return {
			/**
          * @type {Dialog[]}
			 */
			dialogs: [],
      };
   },


   beforeMount(){
		events.EE.removeAllListeners();
   	events.EE.on(events.EVENTS.DIALOGS.ADD, s => this.addDialog(s));
		events.EE.on(events.EVENTS.DIALOGS.DISMISS, id => this.dismissDialogById(id));
		events.EE.on(events.EVENTS.DIALOGS.DISMISS_ALL, () => this.removeAll());
		events.EE.on(events.EVENTS.DIALOGS.DISMISS_HASH, hash => this.removeHash(hash));
		events.EE.on(events.EVENTS.DIALOGS.DISMISS_GROUP, group => this.removeGroup(group));
   },


   methods: {


      /**
       *
       * @param {Dialog} dialog
       */
		removeDialog(dialog){
      	const index = this.dialogs.findIndex(d => d.id == dialog?.id);
      	if(index >= 0){
      		if(window.location.hash == '#' + dialog.hash || window.location.hash == dialog.hash)
					this.$router.go(-1);
				this.dialogs.splice(index, 1);
				dialog.removeAllListeners();
         }
      },


		removeHash(hash){
			const dialogs = this.dialogs.filter(d => d.hash == hash);
			for(let dialog of dialogs)
				dialog?.dismiss();
		},


      removeGroup(group){
			const dialogs_on_group = this.dialogs.filter(d => d.group == group);
			for(let dialog of dialogs_on_group)
				dialog?.dismiss();
      },


		removeAll(){
			for(let dialog of [...this.dialogs])
				dialog?.dismiss();
		},


		pop(){
			if(!this.dialogs?.length)
				return null;

			const last = this.dialogs[this.dialogs.length - 1];

			last?.dismiss();

			return last;
		},


		/**
       *
		 * @param {Dialog} dialog
		 */
		addDialog(dialog){
			window.location.hash = dialog.hash;
         dialog.once(Dialog.EVENTS.DISMISS, d => this.removeDialog(d));
         this.dialogs.push(dialog);
      },


		dismissDialogById(id){
			const dialog = this.dialogs.find(s => s.id == id);
			dialog?.dismiss();
      },

   }

}
</script>



<style>
.v-dialog-display{
   position: fixed;

   top: 0;
   left: 0;

   width: 100%;
   height: 100%;

   z-index: 15;
}
.v-dialog-display > .-dialogs{
   display: flex;
   flex-direction: column;
   width: 100%;
   height: 100%;
}


.v-dialog-display > .-dialogs > .-dialog.dialog-enter-active{
   animation-name: dialog-fade-in;
   animation-duration: 0.3s;
   animation-timing-function: ease;
   animation-fill-mode: both;
}
.v-dialog-display.dialog-display-leave-active > .-dialogs,
.v-dialog-display > .-dialogs > .-dialog.dialog-leave-active{
   position: absolute;
   animation-name: dialog-fade-out;
   animation-duration: 0.3s;
   animation-timing-function: ease;
   animation-fill-mode: both;
}
@keyframes dialog-fade-in{
   from{
      opacity: 0;
   }
}
@keyframes dialog-fade-out{
   to{
      opacity: 0;
   }
}
</style>
