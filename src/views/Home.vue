<template>
  <div>
    <app-bar :controller="controller"></app-bar>
    <v-navigation-drawer
      width="400"
      absolute
      clipped
      right
      @keypress="controller.drawer = false"
      v-model="controller.drawer"
    >
      <filter-station :controller="controller"></filter-station>
    </v-navigation-drawer>
    <v-main style="height: 100vh">
      <div id="map"></div>
      <popup-station
        :controller="controller"
        class="popup-container"
      ></popup-station>
      <v-snackbar v-model="controller.snackbar" :timeout="5000" color="red">
        {{ controller.message }}
        <template v-slot:action="{ attrs }">
          <v-btn icon v-bind="attrs" @click="controller.snackbar = false">
            <v-icon color="red">mdi-close</v-icon>
          </v-btn>
        </template>
      </v-snackbar>
    </v-main>
  </div>
</template>

<script>
//Components

import AppBar from '../components/AppBar.vue'
import FilterStation from '../components/Filter.vue'
import PopupStation from '../components/Popup.vue'
//Controller da aplicação
import Controller from '../state/store/controller.js'
export default {
  name: 'App',
  components: {
    AppBar,
    FilterStation,
    PopupStation,
  },
  data: (context) => ({
    controller: new Controller(context),
  }),

  async mounted() {
    this.controller.created()
    this.controller.initMap()
  },
}
</script>

<style>
#map {
  position: absolute;
  padding: 0;
  margin-top: 0px;
  height: 100%;
  width: 100%;
}
</style>
