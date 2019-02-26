<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm12 pa-2>
        <v-container><h1>Movie</h1></v-container>
      </v-flex>
    </v-layout>
    <v-container fluid grid-list-md>
      <v-flex xs12 sm12 md4 lg6>
        <v-card>
          <v-card-title><h1 style="color: #C62828">{{ movie.title }}</h1></v-card-title>
          <v-divider></v-divider>
          <v-list dense>
            <v-card-title><h2 style="color: #37474F">Title:</h2><h2 style="margin-left: 20px">{{ movie.title }}</h2></v-card-title>
            <v-card-title style="margin-top: 8px">
              <h2 style="color: #37474F">Synopsys:</h2>
              <v-btn color="info" style="margin-left: 20px" dark v-on:click="changeStatusShowSynopsys">Load</v-btn>
            </v-card-title>
            <v-card-title v-if="showSynopsys"><v-card-text style="margin-left: 10px; font-size:16px">{{movie.synopsys}}</v-card-text></v-card-title>
            <v-card-title style="margin-top: 8px"><h2 style="color: #37474F">Year:</h2><h2 style="margin-left: 20px">{{ movie.year }}</h2></v-card-title>
            <v-card-title style="margin-top: 8px"><h2 style="color: #37474F">Genre:</h2><h2 style="margin-left: 20px">{{ movie.genre }}</h2></v-card-title>
            <v-card-title style="margin-top: 8px">
              <h2 style="color: #37474F">Rating:</h2>
              <v-rating :value="averageRating(movie.ratings)" style="margin-left: 20px" color="amber" dense half-increments readonly size="28"></v-rating>
              <h2>{{averageRating(movie.ratings)}}</h2>
            </v-card-title>
            <v-card-title><h2>Poster: <v-btn style="margin-left: 20px" color="purple" dark v-on:click="changeStatusShowPoster">Load poster</v-btn></h2></v-card-title>
            <v-card-title v-if="showPoster">
              <v-img :src="movie.poster" max-height="729" max-width="547" class="grey darken-4"></v-img>
              </v-card-title>
            <v-divider></v-divider>
            <v-card-title><h2 style="color: #C62828">Director:</h2></v-card-title>
            <v-divider></v-divider>
            <v-card-title><h2 style="color: #37474F">Name:</h2><h2 style="margin-left: 20px">{{ movie.director.name }}</h2></v-card-title>
            <v-card-title><h2 style="color: #37474F">Nationality:</h2><h2 style="margin-left: 20px">{{ movie.director.nationality }}</h2></v-card-title>
            <v-card-title><h2 style="color: #37474F">Birthday:</h2><h2 style="margin-left: 20px">{{ movie.director.birthday }}</h2></v-card-title>
          </v-list>
        </v-card>
      </v-flex>
      <v-flex xs12 sm4 pa-2>
        <v-btn color="success" v-on:click="$router.push({ name: 'edit', params: { id: movie.id } })">Edit</v-btn>
        <!-- <v-btn color="error" v-on:click="changeStatusDialogDelete">Delete</v-btn> -->
        <v-btn color="error" v-on:click="changeStatusDialogDelete()">Delete</v-btn>
        <v-btn color="warning" v-on:click="$router.push({ name: 'home'})">Cancel</v-btn>
      </v-flex>
      <v-form v-model="valid">
        <v-text-field v-model="theRate" :counter="1" :rules="rateRules" label="Rate" required type="number"></v-text-field>
        <v-btn :disabled="!valid" color="yellow darken-1" v-on:click="rateMovie()">Rate</v-btn>
      </v-form>
    </v-container>
    <div class="text-xs-center">
    <v-dialog v-model="dialogDelete" v-if="dialogDelete" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Are you sure to delete this movie ?</v-card-title>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat v-on:click="remove()">I accept</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "movieitem",
  //props: ["movie"],
  data: function() {
    return {
      obj: {},
      drawer: false,
      showPoster: false,
      showSynopsys: false,
      movies: new Array(),
      movie: new Array(),
      display_details: false,
      valid: true,
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      dialogDelete: false,
      valid: true,
      rateRules: [
        y => !!y || 'Rate is required',
        y => (y && y.length == 1) || 'Rate must be than 1 characters',
        y => (y && (y == 0 || y == 1 || y == 2 || y == 3 || y == 4 || y == 5 || y == 0.5 || y == 1.5 || y == 2.5 || y == 3.5 || y == 4.5)) || 'Rate must be between 0 and 5'
      ],
    };
  },
  methods: {
    drawerSetFalse(){
      if(this.drawer){
        this.drawer = !this.drawer;
      }
    },
    averageRating(ratings) {
      let result = 0;
      ratings.forEach(r => (result += r));
      return result / ratings.length;
    },
    changeStatusShowPoster(){
      this.showPoster = !this.showPoster;
      console.log(showPoster);
      return showPoster;
    },
    changeStatusShowSynopsys(){
      this.showSynopsys = !this.showSynopsys;
      console.log(showSynopsys);
      return showSynopsys;
    },
    changeStatusDialogDelete(){
      this.dialogDelete = !this.dialogDelete;
      console.log(dialogDelete);
      return dialogDelete;
    },
    remove() {
      ///   Ré-initialise dialogDelete   ///
      axios.delete(`/api/movies/${this.$route.params.id}`);
      this.dialogDelete = !this.dialogDelete;
      ///   Permet de revenir à la page d'accueil   ///
      this.$router.push({ name: 'home'});
    },
    getUrlVars() {
      var vars = {};
      var parts = window.location.href;
      vars = parts.split('/');
      return vars;
    },
    rateMovie(){
      this.obj.grade = this.theRate;
      axios.post(`/api/movies/${this.$route.params.id}`, this.obj);
      console.log(this.theRate);
      console.log(typeof parseInt(this.theRate));
      this.theRate = null;
      this.$router.push({ name: 'home'});
    },

  },
  created: function() {
            console.log("Created");
            var $this = this;
            axios.get("http://localhost:8080/api/movies/all").then(function(response) {
                if (response.status == 200) {
                    $this.movies = response.data;
                    $this.movies.forEach(element => {
                      var vars = {};
                      var parts = window.location.href;
                      vars = parts.split('/');
                      if(element.id == vars[4] || element.id == vars[5]){
                        $this.movie = element;
                      };
                    });
                }
            });
        },
};
</script>