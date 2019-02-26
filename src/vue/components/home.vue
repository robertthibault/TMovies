<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm5 pa-2>
        <v-container>
          <!-- Champs pour rechercher un film par son titre -->
          <v-text-field v-model="search" label="Search Movie" required outline></v-text-field>
        </v-container>
      </v-flex>
    </v-layout>
    <!-- Affiche tous les films présent dans la variable movies -->
    <v-layout row wrap>
      <v-flex xs12 sm4 pa-2 v-for="(movie) in movies_search" v-bind:key="movie.title">
        <v-card>
          <!-- Affiche tous les films présent dans la variable movies -->
          <v-img :src="yesNo(movie.poster)" max-height="729"></v-img>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{ movie.title }}</h3>
              <v-rating :value="averageRating(movie.ratings)" color="amber" dense half-increments readonly size="28"></v-rating>
              <span>{{ averageRating(movie.ratings) }}</span>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn slot="activator" color="purple" dark v-on:click="$router.push({ name: 'movieitem', params: { id: movie.id } })">More info</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <v-btn slot="activator" color="green" dark v-on:click="$router.push({ name: 'add'})">Add a Movie</v-btn>
    
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "home",
  data() {
    return {
      drawer: false,
      movies: new Array(),
      search: '',
      user: {},
    };
  },
  methods: {
    /*    Permet de set la variable drawer à false    */
    drawerSetFalse(){
      if(this.drawer){
        this.drawer = !this.drawer;
      }
    },
    /*    Permet de faire la moyenne de toutes les notes d'un film    */
    averageRating(ratings) {
      let result = 0;
      ratings.forEach(r => (result += r));
      return result / ratings.length;
    },
    /*    Permet de savoir si il existe une image pour un film    */
    yesNo(url){
      let resultat = "require('@./../static/noImage.jpg')";
      if(url.indexOf(".jpg") != -1 || url.indexOf(".png") != -1 || url.indexOf(".jpeg") != -1){
        resultat = url;
      }
      return resultat;
    },
  },
  /*    Permet d'initialiser la variable movies avec les données de tous les films
        Et permet d'initialiser la variable user avec le user connecté    */
  created: function() {
    console.log("Created");
    var $this = this;
    axios.get("http://localhost:8080/api/movies/all").then(function(response) {
      if (response.status == 200) {
        $this.movies = response.data;
      };
    });
    axios.get("http://localhost:8080/api/user").then(function(response) {
      if (response.status == 200) {
        $this.user = response.data;
      }
    });
    if($this.user.length == 1){
      axios.post('/api/user', this.user);
      window.location.reload();
    };
  },

  computed: {
    /*    Permet de retourner la première lettre du message    */
    firstletter: function() {
      return this.message[0];
    },
    /*    Permet de trouver les films correspondant à la chaîne de caractères du champs search    */
    movies_search: function(chaine) {
      return this.movies.filter(
        m => m.title.toLowerCase().indexOf(this.search.toLowerCase()) != -1
      );
    }
  }
};
</script>

<style scoped>
</style>