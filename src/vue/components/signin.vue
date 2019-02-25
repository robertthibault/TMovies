<template>
  <v-container>
    <v-container v-if="user.length == 0">
      <v-app>
        <v-content>
          <v-container fluid fill-height>
            <v-layout align-center justify-center>
              <v-flex xs12 sm8 md4>
                <v-card class="elevation-8">
                  <v-toolbar dark color="teal">
                    <v-toolbar-title>Login</v-toolbar-title>
                    <v-spacer></v-spacer>
                  </v-toolbar>
                  <v-card-text>
                    <v-form>
                      <v-text-field v-model="connect.email" prepend-icon="person" name="login" label="Email" type="text"></v-text-field>
                      <v-text-field v-model="connect.password" prepend-icon="lock" name="password" label="Password" id="password" type="password"></v-text-field>
                    </v-form>
                  </v-card-text>
                  <v-card-text v-if="showErreur" style="color: #C62828">login or password is incorrect</v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn dark color="teal" v-on:click="searchUser(connect); $router.push({ name: 'home'})">Login</v-btn>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-content>
      </v-app>
    </v-container>
    <v-container v-else>
      <v-app>
        <v-content>
          <v-container fluid fill-height>
            <v-layout align-center justify-center>
              <v-flex xs12 sm8 md4>
                <v-card class="elevation-8">
                  <v-toolbar dark color="teal">
                    <v-toolbar-title>Bienvenue</v-toolbar-title>
                    <v-spacer></v-spacer>
                  </v-toolbar>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn dark color="teal" v-on:click="disco(); $router.push({ name: 'home'})">Disconnect</v-btn>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-content>
      </v-app>
    </v-container>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "signin",
  data: function() {
    return {
      users: {},
      drawer: false,
      connect: {},
      user: {},
      showErreur: false,
    };
  },
  methods: {
    disco(){
      axios.delete('/api/user');
      this.user = {};
      this.users = {};
      //window.location.reload();
    },
    drawerSetFalse(){
      if(this.drawer){
        this.drawer = !this.drawer;
      }
    },
    searchUser(theUser){
      this.showErreur = false;
      let trouve= false;
      this.users.forEach(element => {
        if(element.email == theUser.email && element.password == theUser.password){
          this.user = element;
          console.log(this.user);
          trouve = true;
          axios.post('/api/user', this.user);
        };
      });
      if(!trouve){
        this.showErreur = !trouve;
        this.connect = {};
        this.user = {};
      };
    },
  },
  created: function() {
    console.log("Created");
    var $this = this;
    axios.get("http://localhost:8080/api/users/all").then(function(response) {
      if (response.status == 200) {
        $this.users = response.data;
      }
    });
    axios.get("http://localhost:8080/api/user").then(function(response) {
      if (response.status == 200) {
        $this.user = response.data;
      }
    });
  },
};
</script>

<style scoped>
</style>