<template>
  <v-app>
    <v-navigation-drawer clipped fixed v-model="drawer" flat app>
      <v-list dense>
        <v-list-tile v-on:click="$router.push({ name: 'home', drawer: false}); drawerSetFalse()">
          <v-list-tile-action>
            <v-icon>fas fa-home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-on:click="$router.push({ name: 'add'}); drawerSetFalse()">
          <v-list-tile-action>
            <v-icon>fas fa-plus</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Add a Movie</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="user.length == 0" v-on:click="$router.push({ name: 'signin'}); drawerSetFalse()">
          <v-list-tile-action>
            <v-icon>fas fa-sign-in-alt</v-icon> <!-- fas fa-sign-out-alt -->
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Sign In</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-else v-on:click="$router.push({ name: 'signin'}); drawerSetFalse()">
          <v-list-tile-action>
            <v-icon>fas fa-sign-out-alt</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Sign Out</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="user.length == 0">
          <v-list-tile-action>
            <v-icon>fas fa-user-plus</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Sign Up</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>TMovie</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat slot="activator" v-on:click="$router.push({ name: 'home'}); drawerSetFalse()">Home</v-btn>
        <v-btn flat slot="activator" v-on:click="$router.push({ name: 'add'}); drawerSetFalse()">Add a Movie</v-btn>
        <v-btn v-if="user.length != 0" flat slot="activator" color="teal" v-on:click="$router.push({ name: 'signin'}); drawerSetFalse()">Sign Out</v-btn>
        <v-btn v-if="user.length == 0" flat slot="activator" color="teal" v-on:click="$router.push({ name: 'signin'}); drawerSetFalse()">Sign In</v-btn>
        <v-btn v-if="user.length == 0" flat slot="activator" color="teal">Sign Up</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-container>
      <router-view></router-view>
    </v-container>
    <v-footer app fixed dark>
      <div style="justify-content: center">Created by Thibault ROBERT &nbsp;&nbsp;&nbsp; &copy; 2019</div>
    </v-footer>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  name: "app",
  data() {
    return {
      drawer: false,
      user: {},
    };
  },
  methods: {
    drawerSetFalse(){
      if(this.drawer){
        this.drawer = !this.drawer;
      }
    },
  },
  created: function() {
    console.log("Created");
    var $this = this;
    axios.get("http://localhost:8080/api/user").then(function(response) {
      if (response.status == 200) {
        $this.user = response.data;
      }
    });
  },
};
</script>