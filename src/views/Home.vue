<template>
  <div>
    <app-bar :controller="controller"></app-bar>

    <v-navigation-drawer
      width="400"
      absolute
      clipped
      right
      v-model="controller.drawer"
    >
      <filtro :controller="controller"></filtro>
    </v-navigation-drawer>
    <v-main style="height: 100vh">
      <div id="map"></div>
      <Form></Form>
    </v-main>
  </div>
</template>

<script>
//Components

import AppBar from '../components/AppBar.vue'
import Filtro from '../components/Filtro.vue'
import Form from '../components/Form.vue'
//Controller da aplicação
import Controller from '../state/store/controller.js'
export default {
  name: 'App',
  components: {
    AppBar,
    Filtro,
    Form,
  },
  data: (context) => ({
    controller: new Controller(context),
  }),

  mounted() {
    this.controller.created()
    this.controller.initMap()
  },
}
</script>

<style>
#map {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
</style>
