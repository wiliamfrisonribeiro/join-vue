<template>
  <v-menu v-model="controller.menuFiltro" :close-on-content-click="false">
    <template v-slot:activator="{ on }">
      <v-btn small outlined color="primary" v-on="on">
        <v-icon left smal>mdi-filter</v-icon> Filtro
      </v-btn>
    </template>

    <v-card class="mx-auto" max-width="750" min-width="750">
      <v-card-title> Filtro </v-card-title>
      <v-card-text>
        <v-autocomplete
          dense
          v-model="controller.stations_types_selected"
          :items="controller.station_type_list"
          label="Tipos de Estações"
          clearable
          multiple
          small-chips
          return-object
          no-data-text="Sem dados"
          persistent-hint
          :hint="`${controller.stations_types_selected.length} Opções Selecionadas`"
        ></v-autocomplete>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script>
import Controller from '../state/store/controller'
export default {
  name: 'Filtro',
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
