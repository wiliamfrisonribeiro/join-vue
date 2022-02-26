<template>
  <v-app>
    <app-bar></app-bar>
    <v-main> <filtro :controller="controller"></filtro> </v-main>
  </v-app>
</template>

<script>
//Components

import AppBar from './components/AppBar.vue'
import Filtro from './components/Filtro.vue'
//Controller da aplicação
import Controller from './state/store/controller'
export default {
  name: 'App',
  components: {
    AppBar,
    Filtro,
  },
  data: (context) => ({
    controller: new Controller(context),
  }),
  created() {
    this.controller.fetchStation()
    this.controller.fetchStationType()
    this.controller.fetchFeatures()
  },
}
</script>
