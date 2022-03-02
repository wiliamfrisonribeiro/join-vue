<template>
  <v-app-bar app color="cyan lighte-1" height="80">
    <div>
      <v-img contain src="/logo.png" max-width="130" max-height="85"> </v-img>
    </div>
    <v-spacer></v-spacer>
    <v-tooltip top>
      <template v-slot:activator="{ on }">
        <v-btn
          icon
          href="https://github.com/wiliamfrisonribeiro/join-vue"
          color="white"
          v-on="on"
        >
          <v-icon>mdi-github</v-icon>
        </v-btn>
      </template>
      <span>Github</span>
    </v-tooltip>
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
