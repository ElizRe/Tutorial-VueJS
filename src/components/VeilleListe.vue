<template>
<v-app>
  <div id="liste">
    <div class="filters">
      <input
        type="text"
        placeholder="Rechercher"
        v-model="searchTxt" />
      <select v-model="searchTheme">
        <option value="all">Thématique</option>
        <option v-for="(theme, index) in themes" v-bind:value="theme">{{ theme }}</option>
      </select>
    </div>


    <div class="subjects">
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-toolbar color="pink" dark>

            <v-toolbar-title>Liste des veilles</v-toolbar-title>
            <v-spacer></v-spacer>

          </v-toolbar>
          <v-list two-line>
            <template v-for="(subject, index) in subjectsFiltres">
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>{{ subject.title }}</v-list-tile-title>

                  <v-list-tile-sub-title>{{ subject.author }}</v-list-tile-sub-title>
                </v-list-tile-content>

              </v-list-tile>
              <v-divider v-if="index + 1 < subjects.length" :key="subject.title"></v-divider>
            </template>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
  </div>
  </v-app>
</template>

<script>
/* eslint-disable */
export default {
  name: 'VeilleListe',
  data () {
    return {
      searchTxt: '',
      searchTheme: 'all',
      themes: [],
      subjects: [
        { title: 'Tout savoir sur VueJS', author: 'Raphaël', themes: ['VueJS', 'JS'], date: "" },
        { title: 'Apprendre et étudier le JS', author: 'Victoria', themes: ['VueJS', 'JS'], date: "" },
        { title: 'Angular VS ReactJS', author: 'Éric', themes: ['ReactJS', 'Angular', 'JS'], date: "" },
        { title: 'Apprendre le CSS', author: 'Nicolas', themes: ['CSS'], date: "" }
      ],
    }
  },
  created: function () {
    this.themes = this.getThemes();
  },
  computed: {
    subjectsFiltres: function()
    {
       let self = this;
       return this.subjects.filter(function(subject) {

        // Filter on title and author
        let title = self.normlizeText(subject.title);
        let author = self.normlizeText(subject.author);
        let searchTxt = self.normlizeText(self.searchTxt);
        let filter1 = title.indexOf(searchTxt) >= 0 || author.indexOf(searchTxt) >= 0;

        // Filter on theme, date: ""
        let filter2 = subject.themes.indexOf(self.searchTheme) >= 0 || self.searchTheme == 'all';

        return filter1 && filter2;
      });
    }
  },
  methods: {
    normlizeText: function(str) {
      // Change to lower case and remove first & last spaces
      str = str.toLowerCase().trim();
      // Remove accents
      return str.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    },
    getThemes: function() {
      let themes = [];
      // Merge all themes
      this.subjects.forEach(function(subject) {
        Array.prototype.push.apply(themes, subject.themes);

      });
      // Remove duplicates
      themes = themes.filter(function(elem, index, self) {
          return index === self.indexOf(elem);
      });
      // Return sorted array
      return themes.sort();
    }
  }
}

</script>
