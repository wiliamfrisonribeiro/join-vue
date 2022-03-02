<template>
  <div>
    <app-bar :controller="controller"></app-bar>

    <v-main style="height: 100vh">
      <filter-stations :controller="controller"></filter-stations>
      <div id="map"></div>
      <popup-station
        :controller="controller"
        class="popup-container"
        id="tooltipMap"
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
import AppBar from '../components/AppBar.vue'
import PopupStation from '../components/Popup.vue'
import FilterStations from '../components/Filter.vue'
import Controller from '../state/store/controller.js'
export default {
  name: 'App',
  components: {
    AppBar,
    FilterStations,
    PopupStation,
  },
  data: (context) => ({
    controller: new Controller(context),
  }),

  created() {
    this.controller.created()
  },

  mounted() {
    this.controller.initMap()
  },
}
</script>

<style>
#map {
  height: 100%;
  width: 100%;
}
</style>
