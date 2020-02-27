import Vue from 'vue'
import App from './App.vue'
import VueApexCharts from 'vue-apexcharts';
import VueMobileDetection from 'vue-mobile-detection'

Vue.config.productionTip = false

Vue.use(VueApexCharts);
Vue.use(VueMobileDetection)

new Vue({
  render: h => h(App),
}).$mount('#app')
