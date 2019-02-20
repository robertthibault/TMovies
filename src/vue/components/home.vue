<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm5 pa-2>
        <v-container>
          <v-text-field v-model="search" label="Search Movie" required outline></v-text-field>
        </v-container>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <!-- <v-flex xs12 sm4 pa-2 v-for="(movie) in movies" v-if="existe(movie.title, Search)" v-bind:key="movie.title"> -->
      <v-flex xs12 sm4 pa-2 v-for="(movie) in movies_search" v-bind:key="movie.title">
        <v-card>
          <!-- <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" aspect-ratio="2.75"></v-img> -->
          <!-- <v-img src="http://fr.web.img3.acsta.net/r_1280_720/medias/nmedia/18/36/27/14/20051394.jpg"></v-img> -->
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
    yesNo(url){
      let resultat = "require('@/../../static/noImage.jpg')";
      if(url.indexOf(".jpg") != -1 || url.indexOf(".png") != -1 || url.indexOf(".jpeg") != -1){
        resultat = url;
      }
      return resultat;
    },
  },

  created: function() {
    console.log("Created");
    var $this = this;
    axios.get("http://localhost:8080/api/movies/all").then(function(response) {
      if (response.status == 200) {
        $this.movies = response.data;
      }
    });
  },

  computed: {
    firstletter: function() {
      return this.message[0];
    },
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