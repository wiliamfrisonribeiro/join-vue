<template>
  <v-card width="500" class="popup-container">
    <v-card-title id="card-title">Dados da Estação</v-card-title>
    <v-card-text class="popup-container">
      <v-container fluid class="popup-container">
        <v-row class="popup-container">
          <v-col class="d-flex" cols="3">
            <v-text-field
              label="ID"
              dense
              outlined
              v-model="controller.station.id"
            >
            </v-text-field>
          </v-col>
          <v-col class="d-flex" cols="9">
            <v-text-field
              label="Name"
              outlined
              dense
              v-model="controller.station.name"
            >
            </v-text-field>
          </v-col>

          <v-col class="d-flex" cols="6">
            <v-text-field
              outlined
              dense
              label="Longitude"
              v-model="controller.station.longitude"
            >
            </v-text-field>
          </v-col>
          <v-col class="d-flex" cols="6">
            <v-text-field
              outlined
              dense
              label="Longitude"
              v-model="controller.station.longitude"
            >
            </v-text-field>
          </v-col>

          <v-col class="d-flex" cols="2">
            <v-text-field
              outlined
              label="Elevação"
              dense
              v-model="controller.station.elevation"
            >
            </v-text-field>
          </v-col>
          <v-col cols="5">
            <v-text-field
              outlined
              dense
              append-icon="mdi-clock"
              label="Inicio de Operação"
              v-model="controller.station.initOperetion"
            >
            </v-text-field>
          </v-col>
          <v-col class="d-flex" cols="4">
            <v-text-field
              outlined
              dense
              append-icon="mdi-clock"
              label="Fim de Operação"
              v-model="controller.station.endOperetion"
            >
            </v-text-field>
          </v-col>

          <v-col class="d-flex" cols="12">
            <v-text-field
              outlined
              dense
              label="Tipo Estação"
              v-model="controller.station.endOperetion"
            >
            </v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'Form',
  props: {
    controller: {
      type: Object,
      required: true,
    },
  },
}
</script>
