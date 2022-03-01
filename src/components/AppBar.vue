<template>
  <v-app-bar app color="cyan lighte-1">
    <div>
      <v-img contain src="/logo.png" max-width="130" max-height="85"> </v-img>
    </div>
    <v-spacer></v-spacer>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn
          icon
          color="white"
          @click="controller.drawer = !controller.drawer"
          v-on="on"
        >
          <v-icon>mdi-filter</v-icon>
        </v-btn>
      </template>
      <span>Filtros</span>
    </v-tooltip>
    <!--     <v-btn
      href="https://github.com/jacksonks/join-teste-front-vuejs"
      target="_blank"
      text
    >
      <span class="mr-2">Github</span>
      <v-icon></v-icon>
    </v-btn> -->
  </v-app-bar>
</template>
<script>
export default {
  name: 'AppBar',
  props: {
    controller: {
      type: Object,
      required: true,
    },
  },
}
</script>
