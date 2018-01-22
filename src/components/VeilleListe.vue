<template>
  <div id="liste">
<v-app id="inspire">

  </v-app>

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
            <v-toolbar color="light-blue" dark>
             <v-form v-model="valid">
              <v-text-field label="Rechercher" v-model="name" :rules="nameRules">
              </v-text-field>
            </v-form>
            <v-spacer></v-spacer>
            <v-menu offset-y>
              <v-btn color="cyan" dark slot="activator">Thématique</v-btn>
              <v-list>
                <v-list-tile v-for="item in items" :key="item.title" @click="">
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </v-toolbar>
          <v-list two-line subheader>
            <v-list-tile avatar v-for="item in items" v-bind:key="item.title" @click="">
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }} <small>par {{ item.author }}</small></v-list-tile-title>
                <v-list-tile-sub-title>{{ item.date }}</v-list-tile-sub-title>
              </v-list-tile-content>           
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
      <ul>
        <li v-for="(subject, index) in subjectsFiltres">
          {{ subject.title }} <small>par {{ subject.author }}</small>
        </li>
      </ul>
    </div>
  </div>
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
        { title: 'Tout savoir sur VueJS', author: 'Raphaël', themes: ['VueJS', 'JS'], date: '' },
        { title: 'Apprendre et étudier le JS', author: 'Victoria', themes: ['VueJS', 'JS'], date: '' },
        { title: 'Angular VS ReactJS', author: 'Éric', themes: ['ReactJS', 'Angular', 'JS'], date: '' },
        { title: 'Apprendre le CSS', author: 'Nicolas', themes: ['CSS'], date: '' }
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
        
        // Filter on theme
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
