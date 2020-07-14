import Vue from 'vue';
import * as Sentry from '@sentry/browser';
import { Vue as VueIntegration } from '@sentry/integrations';
import VueSocialSharing from 'vue-social-sharing';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import './assets/styles/index.css';


Vue.config.productionTip = false;
Vue.use(VueSocialSharing);

new Vue({
  router,
  store,
  render: (h) => h(App),
  mounted: () => document.dispatchEvent(new Event('x-app-rendered')),
}).$mount('#app');

Sentry.init({
  dsn: process.env.VUE_APP_SENTRY,
  integrations: [new VueIntegration({ Vue, attachProps: true })],
});
