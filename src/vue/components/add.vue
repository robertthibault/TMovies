<template>
    <v-form ref="form" v-model="valid" lazy-validation>
        <h1>Add New movie :</h1>
        <br />
        <!--   Formulaire pour renseigner les données du film qu'on veut ajouter   -->
        <v-text-field v-model="movie_to_add.title" :counter="70" :rules="titleRules" label="Title" required></v-text-field>
        <v-textarea v-model="movie_to_add.synopsys" name="input-7-4" :rules="synopsysRules" label="Synopsys" required></v-textarea>
        <v-text-field v-model="movie_to_add.year" :counter="4" :rules="yearRules" label="Year" required type="number"></v-text-field>
        <v-text-field v-model="movie_to_add.genre" :counter="40" :rules="genreRules" label="Genre" required></v-text-field>
        <v-text-field v-model="movie_to_add.poster" label="URL Poster"></v-text-field>
        <!--   Formulaire pour renseigner les données du réalisateur du film qu'on veut ajouter   -->
        <h2>Director :</h2>
        <v-text-field v-model="director.name" :counter="40" :rules="nameRules" label="Name" required></v-text-field>
        <v-text-field v-model="director.nationality" :counter="30" :rules="nationalityRules" label="Nationality" required></v-text-field>
        <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :nudge-right="40" :return-value.sync="date" lazy transition="scale-transition" offset-y full-width min-width="290px">
        <v-text-field slot="activator" v-model="date" label="Birthday" prepend-icon="event" readonly></v-text-field>
        <v-date-picker v-model="date" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
          <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
        </v-date-picker>
      </v-menu>
        <v-btn :disabled="!valid" color="success" v-on:click="newmovie">Validate</v-btn>
        <v-btn color="error" @click="reset">Reset Form</v-btn>
        <v-btn color="warning" v-on:click="$router.push({ name: 'home'})">Cancel</v-btn>
    </v-form>
</template>

<script>
    import axios from "axios";
    export default {
        data() {
            return{
                drawer: false,
                movies: new Array(),
                movie_to_add: {},
                director: {},
                valid: true,
                date: new Date().toISOString().substr(0, 10),
                birthday: null,
                menu: false,
                modal: false,
                menu2: false,
                // Name: '',
                nameRules: [
                    n => !!n || 'Name is required',
                    n => (n && n.length <= 50) || 'Name must be less than 50 characters'
                ],
                // Title: '',
                titleRules: [
                    t => !!t || 'Title is required',
                    t => (t && t.length <= 70) || 'Title must be less than 35 characters'
                ],
                // Synopsys: '',
                synopsysRules: [
                    s => !!s || 'Synopsys is required'
                ],
                // Genre: '',
                genreRules: [
                    g => !!g || 'Genre is required',
                    g => (g && g.length <= 40) || 'Genre must be less than 20 characters'
                ],
                // Year: '',
                yearRules: [
                    y => !!y || 'Year is required',
                    y => (y && y.length == 4) || 'Year must be than 4 characters'
                ],
                // Nationality: '',
                nationalityRules: [
                    a => !!a || 'Nationality is required',
                    a => (a && a.length <= 30) || 'Nationality must be less than 30 characters'
                ],
            }
        },
        name: "add",
        methods: {
            /*           Fonction pour ré-initialiser le formulaire           */
            reset () {
                this.$refs.form.reset()
            },
            /*           Fonction pour ajouter un nouveau film dans l'API           */
            newmovie: function () {
                ///   Cherhce l'id le plus grand et ajoute 1 à la valeur   ///
                let derenierId = 0;
                this.movies.forEach(element => {
                    let idActu = element.id;
                    if(idActu >= derenierId && idActu != 0){
                        derenierId = idActu;
                    }
                });
                derenierId += 1;
                ///   Permet de donner à l'objet movie_to_add toutes ses valeurs   ///
                this.movie_to_add.id = derenierId;
                this.movie_to_add.ratings = [];
                this.birthday = this.date;
                this.director.birthday = this.birthday;
                this.movie_to_add.director = this.director;
                this.movies.push(this.movie_to_add);
                ///   Ajoute le nouvel objet à l'API   ///
                axios.post('/api/movies/all', this.movie_to_add);
                ///   Ré-initialise tout   ///
                this.movie_to_add = {};
                this.director = {};
                ///   Permet de revenir à la page d'accueil   ///
                this.$router.push({ name: 'home'})
            },
            //Permet de set la valeur de la variable drawer à false
            drawerSetFalse(){
                if(this.drawer){
                    this.drawer = !this.drawer;
                }
            },
        },
        /*           Créer l'objet movies en fonction des donnée de l'API           */
        created: function() {
            console.log("Created");
            var $this = this;
            axios.get("http://localhost:8080/api/movies/all").then(function(response) {
                if (response.status == 200) {
                    $this.movies = response.data;
                }
            });
        },
    }
</script>

<style scoped>
</style>