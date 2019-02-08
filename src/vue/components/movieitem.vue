<template>
  <!--<li @click="display_details=!display_details">
    <b>{{movie.title}} ({{movie.year}})</b>
    <br>
    <span v-if="display_details">
      <p>{{movie.synopsys}}</p>
      <p>{{movie.genre}}</p>
      <p><b>Réalisateur:</b> {{movie.director.name}}, birthday: {{movie.director.birthdate}}, nationality: {{movie.director.nationality}}</p>
      <button v-on:click="$router.push({ name: 'edit', params: { id: movie.id } })">Edit</button>
      <button v-on:click="remove(movie.id)">Remove</button>
    </span>
    <br>
    <br>
  </li>-->
  <v-form ref="form" v-model="valid" lazy-validation>
        <h1>Edit movie :</h1>
        <br />
        <v-text-field v-model="Title" :counter="35" :rules="titleRules" label="Title" required></v-text-field>
        <v-textarea v-model="Synopsys" name="input-7-4" :rules="synopsysRules" label="Synopsys" required></v-textarea>
        <v-text-field v-model="Year" :counter="4" :rules="yearRules" label="Year" required></v-text-field>
        <v-text-field v-model="Genre" :counter="20" :rules="genreRules" label="Genre" required></v-text-field>
        <h2>Director :</h2>
        <v-text-field v-model="Name" :counter="40" :rules="nameRules" label="Name" required></v-text-field>
        <v-text-field v-model="Nationality" :counter="30" :rules="nationalityRules" label="Nationality" required></v-text-field>
        <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :nudge-right="40" :return-value.sync="date" lazy transition="scale-transition" offset-y full-width min-width="290px">
        <v-text-field slot="activator" v-model="date" label="Birthday" prepend-icon="event" readonly></v-text-field>
        <v-date-picker v-model="date" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
          <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
        </v-date-picker>
      </v-menu>
        <v-btn color="success" @click="validate">Validate</v-btn>
        <v-btn color="error" @click="remove">Remove</v-btn>
        <v-btn color="warning" v-on:click="$router.push({ name: 'home'})">Cancel</v-btn>
    </v-form>
</template>

<script>
export default {
  name: "movieitem",
  props: ["movie"],
  data: function() {
    return {
      display_details: false,
      valid: true,
                date: new Date().toISOString().substr(0, 10),
                menu: false,
                modal: false,
                menu2: false,
                Name: '',
                nameRules: [
                    n => !!n || 'Name is required',
                    n => (n && n.length <= 50) || 'Name must be less than 50 characters'
                ],
                Title: '',
                titleRules: [
                    t => !!t || 'Title is required',
                    t => (t && t.length <= 35) || 'Title must be less than 35 characters'
                ],
                Synopsys: '',
                synopsysRules: [
                    s => !!s || 'Synopsys is required'
                ],
                Genre: '',
                genreRules: [
                    g => !!g || 'Genre is required',
                    g => (g && g.length <= 20) || 'Genre must be less than 20 characters'
                ],
                Year: '',
                yearRules: [
                    y => !!y || 'Year is required',
                    y => (y && y.length == 4) || 'Year must be than 4 characters'
                ],
                Nationality: '',
                nationalityRules: [
                    a => !!a || 'Nationality is required',
                    a => (a && a.length <= 30) || 'Nationality must be less than 30 characters'
                ],
    };
  },
  methods: {
    edit() {
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
}};
</script>