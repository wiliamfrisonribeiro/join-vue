<template>
  <v-card class="mx-auto mt-16" flat>
    <v-card-title> Filtros </v-card-title>
    <v-card-text>
      <v-row class="d-flex justify-center">
        <v-col cols="12">
          <v-autocomplete
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
            <template v-slot:prepend-item>
              <v-list-item ripple @click="controller.toggle('stationsType')">
                <v-list-item-action>
                  <v-icon
                    :color="
                      controller.someStations('someStationsType') ||
                      controller.allStations('allStationsType')
                        ? 'red'
                        : '#757575'
                    "
                    >{{ controller.iconStations('iconStationsType') }}</v-icon
                  >
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>
                    {{
                      controller.someStations('someStationsType') ||
                      controller.allStations('allStationsType')
                        ? 'Remover Seleção'
                        : 'Todos'
                    }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider />
            </template>
          </v-autocomplete>
        </v-col>
      </v-row>
      <v-row class="d-flex justify-center">
        <v-col cols="12">
          <v-autocomplete
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
          >
            <template v-slot:prepend-item>
              <v-list-item ripple @click="controller.toggle('')">
                <v-list-item-action>
                  <v-icon
                    :color="
                      controller.someStations('') || controller.allStations('')
                        ? 'red'
                        : '#757575'
                    "
                    >{{ controller.iconStations('') }}</v-icon
                  >
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>
                    {{
                      controller.someStations('') || controller.allStations('')
                        ? 'Remover Seleção'
                        : 'Todos'
                    }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider /> </template
          ></v-autocomplete>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-btn
            color="cyan lighte-1"
            dark
            block
            @click="controller.consulting()"
          >
            <v-icon left color="white"> mdi-magnify</v-icon>Consultar</v-btn
          >
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'Filtro',
  props: {
    controller: {
      type: Object,
      required: true,
    },
  },

  watch: {
    'controller.stations_types_selected'() {
      console.log('passou')
      this.controller.change()
    },
  },

  mounted() {
    this.controller.contextFilter = this
  },
}
</script>
