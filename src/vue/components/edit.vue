<template lang="html">
    <v-form ref="form" v-model="valid" lazy-validation>
        <h1>Edit movie :</h1>
        <br />
        <!--  movie.director.name -->
        <v-text-field v-model="movie_to_edit.title" :counter="70" :rules="titleRules" label="Title" required></v-text-field>
        <v-textarea v-model="movie_to_edit.synopsys" name="input-7-4" :rules="synopsysRules" label="Synopsys" required></v-textarea>
        <v-text-field v-model="movie_to_edit.year" :counter="4" :rules="yearRules" label="Year" required type="number"></v-text-field>
        <v-text-field v-model="movie_to_edit.genre" :counter="40" :rules="genreRules" label="Genre" required></v-text-field>
        <v-text-field v-model="movie_to_edit.poster" label="URL Poster"></v-text-field>
        <h2>Director :</h2>
        <v-text-field v-model="movie_to_edit.director.name" :counter="40" :rules="nameRules" label="Name" required></v-text-field>
        <v-text-field v-model="movie_to_edit.director.nationality" :counter="30" :rules="nationalityRules" label="Nationality" required></v-text-field>
        <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :nudge-right="40" :return-value.sync="date" lazy transition="scale-transition" offset-y full-width min-width="290px">
        <v-text-field slot="activator" v-model="movie_to_edit.director.birthday" label="Birthday" prepend-icon="event" readonly></v-text-field>
        <v-date-picker v-model="movie_to_edit.director.birthday" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
          <v-btn flat color="primary" @click="$refs.menu.save(movie_to_edit.director.birthday)">OK</v-btn>
        </v-date-picker>
      </v-menu>
        <v-btn :disabled="!valid" color="success" v-on:click="updateMovie()">Modify</v-btn>
        <v-btn color="error" @click="reset">Reset Form</v-btn>
        <v-btn color="warning" v-on:click="$router.push({ name: 'home'})">Cancel</v-btn>
    </v-form>
</template>

<script>
    import axios from "axios";
    export default {
        name: "edit",
        drawer: false,
        data() {
            return {
                newPoster: {
                    file: null
                },
                movie_to_edit: {},
            }
        },
        methods: {
            drawerSetFalse(){
                if(this.drawer){
                    this.drawer = !this.drawer;
                }
            },
            // updateMovie() {
            //     ///   Ré-initialise dialogDelete   ///
            //     axios.put(`/api/movies/${this.$route.params.id}`, this.movie_to_edit);
            //     this.movie_to_edit = {};
            //     ///   Permet de revenir à la page d'accueil   ///
            //     this.$router.push({ name: 'home'});
            // },
            updateMovie() {
                ///   Ré-initialise dialogDelete   ///
                axios.delete(`/api/movies/${this.$route.params.id}`);
                axios.post('/api/movies/all', this.movie_to_edit);
                this.movie_to_edit = {};
                ///   Permet de revenir à la page d'accueil   ///
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
                        $this.movie_to_edit = element;
                      };
                    });
                }
            });
        },
    }
</script>