<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm12 pa-2>
        <v-container><h1>Movie</h1></v-container>
        <v-container><h2>Titre : {{movie.title}}</h2></v-container>
        <v-container><h2>Synopsys : {{movie.synopsys}}</h2></v-container>
        <v-container><h2>Year : {{movie.year}}</h2></v-container>
        <v-container><h2>Genre : {{movie.genre}}</h2></v-container>
        <v-container><h2>Poster: <v-btn color="purple" dark v-on:click="changeStatus">Load poster</v-btn></h2></v-container>
        <v-layout v-if="show" key="0" wrap>
            <v-img :src="movie.poster" max-height="729" max-width="547" class="grey darken-4"></v-img>
        </v-layout>
        <v-container><h1>Director :</h1></v-container>
        <v-container><h2>Name : {{movie.director.name}}</h2></v-container>
        <v-container><h2>Nationality : {{movie.director.nationality}}</h2></v-container>
        <v-container><h2>Birthday : {{movie.director.birthday}}</h2></v-container>
      </v-flex>
      <v-flex xs12 sm4 pa-2>
        <v-btn color="success" v-on:click="$router.push({ name: 'edit', params: { id: movie.id } })">Edit</v-btn>
        <v-btn color="error" @click="supp">Delete</v-btn>
        <v-btn color="warning" v-on:click="$router.push({ name: 'home'})">Cancel</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "movieitem",
  //props: ["movie"],
  data: function() {
    return {
      show: false,
      movies: new Array(),
      movie: new Array(),
      display_details: false,
      valid: true,
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
    };
  },
  methods: {
    changeStatus(){
      this.show = !this.show;
      console.log(show);
      return show;
    },
    edit() {
      this.$emit("edit", this.movie);
    },
    supp() {
      this.$emit("edit", this.movie);
    },
    remove(id) {
        if (confirm("Voulez-vous vraiment supprimer ce film ?")) {
            this.$store.dispatch('deleteMovieInAPI', this.id).then(() => {
                this.$router.push({ name: 'home' });
            });
        }
    },
    validate () {
      if (this.$refs.form.validate()) {
        this.snackbar = true
      }
    },
    getUrlVars() {
      var vars = {};
      var parts = window.location.href;
      vars = parts.split('/');
      return vars;
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