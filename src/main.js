import Vue from 'vue'
import App from './App.vue'


window.$ = window.jQuery = require('jquery');
require('bootstrap/dist/js/bootstrap.bundle');

new Vue({
  el: '#app',
  render: h => h(App)
})
