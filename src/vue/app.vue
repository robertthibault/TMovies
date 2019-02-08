<template>
  <v-app>
    <v-toolbar>
      <v-toolbar-title>TMovie</v-toolbar-title>
          <!--C:\Users\rober\OneDrive\Bureau\Movies\src\static-->
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat slot="activator" v-on:click="$router.push({ name: 'home'})">Home</v-btn>
        <v-btn flat slot="activator" v-on:click="$router.push({ name: 'add'})">Add a Movie</v-btn>
        <v-btn flat slot="activator" color="teal">Sign In</v-btn>
        <v-btn flat slot="activator" color="teal">Sign Up</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-container>
      <router-view></router-view>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "app"
};
</script>