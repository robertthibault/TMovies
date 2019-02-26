import app from './app.vue' //fichier app.vue local
import MovieItemComponent from './components/movieitem.vue'
import HomeComponent from './components/home.vue'
import EditComponent from './components/edit.vue'
import AddComponent from './components/add.vue'
import SignInComponent from './components/signin.vue'
import router from './routes.js'

import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify);

Vue.component('movieitem', MovieItemComponent);
Vue.component('home', HomeComponent);
Vue.component('edit', EditComponent);
Vue.component('add', AddComponent);
Vue.component('signin', SignInComponent);

new Vue({
  el: '#app',
  router,
  render: h => h(app)
})
