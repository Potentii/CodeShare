import Vue         from 'vue'
import VState      from 'v-state'
import VTheMask    from 'vue-the-mask'
import VueShortkey from 'vue-shortkey'

import store          from './store'
import router         from './router'
import VLog           from './@plugins/log'
import VId            from './@plugins/id'
import VInject        from './@plugins/inject/inject'
import VSnack         from './@plugins/snackbar/snackbar-plugin'
import VDialog        from './@plugins/dialog/dialog-plugin'

import VRoot from './v-root'

Vue.config.productionTip = process.env.NODE_ENV === 'development';
Vue.config.performance = process.env.NODE_ENV === 'development';

Vue.use(VState);
Vue.use(VTheMask);
Vue.use(VueShortkey);
Vue.use(VLog);
Vue.use(VId);
Vue.use(VInject);
Vue.use(VSnack);
Vue.use(VDialog);

new Vue({
   router,
   store,
   render: h => h(VRoot)
}).$mount('#app');
