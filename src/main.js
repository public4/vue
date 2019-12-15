import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'
import dateFilter from '@/filters/date.filter'
import messagePlugin from '@/utils/message.plugin'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

Vue.config.productionTip = false

Vue.filter('dateFilter', dateFilter)
Vue.use(Vuelidate)
Vue.use(messagePlugin)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
