<template>
   <div class="v-snackbar-display">
<!--      <ul class="-snacks">-->
         <transition-group name="snack" :duration="{ enter: 300, leave: 300 }" tag="ul" class="-snacks">
            <li class="-snack" :key="snack.id" :data-type="snack.type" v-for="snack in snacks">

               <div class="-stripe" :title="getStripeAlt(snack.type)"></div>

               <div class="-content">
                  <span class="-text">{{ snack.text }}</span>
               </div>

               <div class="-actions">
<!--                  <v-gymifie-icon-button-->
<!--                     class="-action"-->
<!--                     :key="btn.id"-->
<!--                     :icon="btn.icon"-->
<!--                     :text="btn.label"-->
<!--                     :title="btn.alt"-->
<!--                     type="button"-->
<!--                     @click="button_onClick(snack, btn)"-->
<!--                     v-for="btn in snack.buttons">-->
<!--                  </v-gymifie-icon-button>-->
               </div>
            </li>
         </transition-group>
<!--      </ul>-->
   </div>
</template>



<script>
import snack_events       from './snack-events';
import Snack              from './snack';



export default{

   name:'v-snackbar-display',


	data(){
      return {
			/**
          * @type {Snack[]}
			 */
			snacks: [],
      };
   },


   beforeMount(){
		snack_events.removeAllListeners();
   	snack_events.on('snacks:add', s => this.addSnack(s));
		snack_events.on('snacks:dismiss', id => this.dismissSnackById(id));
		snack_events.on('snacks:dismiss-group', group => this.removeGroup(group));
		snack_events.on('snacks:dismiss-all', () => this.removeAll());
   },


   methods: {

		/**
		 *
		 * @param {Snack} snack
		 * @param {SnackButton} btn
		 */
      button_onClick(snack, btn){
      	btn?.action?.call(null, snack, btn);
      },


      /**
       *
       * @param {Snack} snack
       */
		removeSnack(snack){
      	const index = this.snacks.findIndex(s => s.id == snack?.id);
      	if(index >= 0){
				this.snacks.splice(index, 1);
				snack.removeAllListeners();
         }
      },


      removeGroup(group){
			const snacks_on_group = this.snacks.filter(s => s.group == group);
			for(let snack of snacks_on_group)
            this.removeSnack(snack);
      },


		removeAll(){
			for(let snack of [...this.snacks])
				this.removeSnack(snack);
		},


		/**
       *
		 * @param {Snack} snack
		 */
		addSnack(snack){
         snack.once('dismiss', s => this.removeSnack(s));
         if(!snack.is_playing)
            snack.play();
         this.snacks.push(snack);
      },


		dismissSnackById(id){
			const snack = this.snacks.find(s => s.id == id);
			snack?.dismiss();
      },


      getStripeAlt(type){
			switch(type){
         case Snack.TYPES.INFO: return 'Informação';
			case Snack.TYPES.SUCCESS: return 'Sucesso';
			case Snack.TYPES.WARNING: return 'Atenção';
			case Snack.TYPES.ERROR: return 'Erro';
         default: return null;
			}
      }

   }

}
</script>



<style>
.v-snackbar-display{
   /*position: fixed;*/

   left: 0;
   bottom: 0;

   width: 100%;

   z-index: 20;
   overflow: visible;
}
.v-snackbar-display > .-snacks{
   display: flex;
   flex-direction: column;

   /*background-color: var(--m-grey-900);*/


}

.v-snackbar-display > .-snacks > .-snack{
   --var-snack-height: 4.3rem;

   display: grid;
   align-items: center;
   grid-template-columns: 10px auto 1fr auto;
   grid-template-rows: auto;
   grid-template-areas:
      'stripe content ... actions';

   grid-column-gap: 1em;

   width: 100%;
   height: var(--var-snack-height);
   background-color: var(--m-grey-900);

   box-shadow: 0 -4px 20px -4px rgba(0,0,0,0.2);

   transition: transform 0.3s ease-out;
}
.v-snackbar-display > .-snacks > .-snack > .-stripe{
   grid-area: stripe;
}
.v-snackbar-display > .-snacks > .-snack > .-content{
   grid-area: content;
}
.v-snackbar-display > .-snacks > .-snack > .-actions{
   grid-area: actions;
}

.v-snackbar-display > .-snacks > .-snack + .-snack::before{
   content: '';
   position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   height: 1px;
   background-color: rgba(255,255,255,0.02);
}

.v-snackbar-display > .-snacks > .-snack.snack-enter-active{
   animation-name: snack-fade-in;
   animation-duration: 0.3s;
   animation-timing-function: ease;
   animation-fill-mode: both;
}
.v-snackbar-display > .-snacks > .-snack.snack-leave-active{
   position: absolute;
   animation-name: snack-fade-out;
   animation-duration: 0.3s;
   animation-timing-function: ease;
   animation-fill-mode: both;
}
@keyframes snack-fade-in{
   from{
      opacity: 0;
      transform: translateY(0.5em);
   }
}
@keyframes snack-fade-out{
   to{
      opacity: 0;
      /*transform: translateY(-0.5em);*/
   }
}

.v-snackbar-display > .-snacks > .-snack > .-stripe{
   height: 100%;
} .v-snackbar-display > .-snacks > .-snack[data-type="error"] > .-stripe{
   background-color: var(--m-red-800);
} .v-snackbar-display > .-snacks > .-snack[data-type="warning"] > .-stripe{
   background-color: var(--m-amber-a400);
} .v-snackbar-display > .-snacks > .-snack[data-type="success"] > .-stripe{
   background-color: var(--m-green-a400);
} .v-snackbar-display > .-snacks > .-snack[data-type="info"] > .-stripe{
   background-color: var(--m-light-blue-a400);
}

.v-snackbar-display > .-snacks > .-snack > .-content{
}

.v-snackbar-display > .-snacks > .-snack > .-content > .-text{
   user-select: text;
   font-size: 1rem;
   color: var(--m-grey-200);
}

.v-snackbar-display > .-snacks > .-snack > .-actions{
   display: flex;

}

.v-snackbar-display > .-snacks > .-snack > .-actions > .-action{
   --v-gymifie-icon-button--height: var(--var-snack-height);
   --v-gymifie-icon-button--width: var(--var-snack-height);
   --v-gymifie-icon-button--fsize: 0.8em;
}
</style>
