<template>
  <v-card width="500" class="popup-container">
    <v-card-title id="card-title">Dados da Estação</v-card-title>
    <v-card-text>
      <v-row>
        <v-col class="pt-0" cols="3" sm="3">
          <v-text-field
            label="ID"
            dense
            outlined
            readonly
            v-model="controller.station.id"
          >
          </v-text-field>
        </v-col>
        <v-col class="pt-0" cols="9" sm="9">
          <v-text-field
            label="Name"
            outlined
            readonly
            dense
            v-model="controller.station.name"
          >
          </v-text-field>
        </v-col>

        <v-col class="pt-0" cols="6" sm="6">
          <v-text-field
            outlined
            readonly
            dense
            label="Longitude"
            v-model="controller.station.longitude"
          >
          </v-text-field>
        </v-col>
        <v-col class="pt-0" cols="6" sm="6">
          <v-text-field
            outlined
            dense
            readonly
            label="Longitude"
            v-model="controller.station.longitude"
          >
          </v-text-field>
        </v-col>

        <v-col cols="5" sm="6 " class="pt-0">
          <v-text-field
            outlined
            readonly
            dense
            append-icon="mdi-calendar-range"
            label="Inicio de Operação"
            v-model="controller.station.initOperetion"
          >
          </v-text-field>
        </v-col>
        <v-col class="pt-0" cols="6" sm="6">
          <v-text-field
            outlined
            readonly
            dense
            append-icon="mdi-calendar-range"
            label="Fim de Operação"
            v-model="controller.station.endOperetion"
          >
          </v-text-field>
        </v-col>
        <v-col class="pt-0" cols="4">
          <v-text-field
            outlined
            label="Elevação"
            dense
            readonly
            v-model="controller.station.elevation"
          >
          </v-text-field>
        </v-col>
        <v-col cols="8" class="py-0 pt-0">
          <v-text-field
            outlined
            dense
            readonly
            label="Tipo Estação"
            v-model="controller.station.stationType"
          >
          </v-text-field>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'popup-station',
  props: {
    controller: {
      type: Object,
      required: true,
    },
  },
}
</script>
