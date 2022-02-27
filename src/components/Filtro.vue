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
          item-text="name"
          item-value="name"
          multiple
          small-chips
          outlined
          return-object
          no-data-text="Sem dados"
          persistent-hint
          :hint="`${controller.stations_types_selected.length} Opções Selecionadas`"
        >
        </v-autocomplete>

        <v-autocomplete
          dense
          :items="controller.stations"
          v-model="controller.stations_selected"
          item-text="name"
          item-value="name"
          label="Estações"
          multiple
          small-chips
          outlined
          clearable
          :disabled="!controller.stations_types_selected.length > 0"
          :hide-details="!controller.stations_types_selected.length > 0"
          :persistent-hint="controller.stations_types_selected.length > 0"
          :hint="`${controller.stations_selected.length} Opções Selecionadas`"
          return-object
          no-data-text="Sem dados"
        ></v-autocomplete>
      </v-card-text>
      <v-row>
        <v-col cols="12">
          <v-btn color="secondary" block>
            <v-icon left dark color="terciary"> mdi-magnify</v-icon
            >Consultar</v-btn
          >
        </v-col>
      </v-row>
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
    this.controller.created()
  },

  watch: {
    'controller.stations_types_selected'() {
      console.log('passou')
      this.controller.change()
    },
  },
}
</script>
