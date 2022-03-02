<template>
  <div id="filter">
    <v-container fluid>
      <v-row>
        <v-card width="500">
          <v-card-title class="headline grey lighten-2">
            Filtros
            <v-spacer />
            <v-tooltip right>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  text
                  fab
                  @click="controller.expand = !controller.expand"
                >
                  <v-icon large v-if="controller.expand === true"
                    >mdi-arrow-collapse-vertical</v-icon
                  >
                  <v-icon large v-else>mdi-chevron-down</v-icon>
                </v-btn>
              </template>
              <strong v-if="controller.expand === true"
                >Esconder Filtros</strong
              >
              <strong v-else>Mostrar Filtros</strong>
            </v-tooltip>
          </v-card-title>
          <v-card-text v-show="controller.expand">
            <br />
            <v-autocomplete
              v-model="controller.stationsTypesSelected"
              :items="controller.stationTypeList"
              label="Tipos de Estações"
              clearable
              item-text="name"
              item-value="name"
              multiple
              small-chips
              outlined
              return-object
              deletable-chips
              no-data-text="Sem dados"
              persistent-hint
              required
              :rules="[(v) => !!v || 'Preencha o Tipo das Estações']"
              :hint="`${controller.stationsTypesSelected.length} Opções Selecionadas`"
            >
              <template v-slot:prepend-item>
                <v-list-item
                  ripple
                  @mousedown.prevent
                  @click="controller.toggleStationType()"
                >
                  <v-list-item-action>
                    <v-icon
                      :color="
                        controller.stationsTypesSelected.length > 0
                          ? 'indigo darken-4'
                          : ''
                      "
                    >
                      {{ controller.iconStationType() }}
                    </v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title> Todos </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-divider class="mt-2"></v-divider>
              </template>
            </v-autocomplete>
            <v-autocomplete
              :items="controller.stations"
              v-model="controller.stationsSelected"
              item-text="name"
              item-value="name"
              label="Estações"
              multiple
              small-chips
              outlined
              deletable-chips
              clearable
              :disabled="!controller.stationsTypesSelected.length > 0"
              :hide-details="!controller.stationsTypesSelected.length > 0"
              :persistent-hint="controller.stationsTypesSelected.length > 0"
              :hint="`${controller.stationsTypesSelected.length} Opções Selecionadas`"
              return-object
              no-data-text="Sem dados"
              :rules="[(v) => !!v || 'Preencha as Estações']"
            >
              <template v-slot:prepend-item>
                <v-list-item
                  ripple
                  @mousedown.prevent
                  @click="controller.toggleStations()"
                >
                  <v-list-item-action>
                    <v-icon
                      :color="
                        controller.stationsTypesSelected.length > 0
                          ? 'indigo darken-4'
                          : ''
                      "
                    >
                      {{ controller.iconStations() }}
                    </v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title> Todos </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-divider class="mt-2"></v-divider> </template
            ></v-autocomplete>
            <span
              v-show="!controller.stationsTypesSelected.length > 0"
              style="color: red"
              >*selecione pelo menos 1 tipo de estação para desbloquear o
              seletor de estações</span
            >
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="cyan lighte-1"
              dark
              block
              @click="controller.consulting()"
              :loading="controller.loading"
            >
              <v-icon left color="white"> mdi-magnify</v-icon>Consultar</v-btn
            >
            <v-spacer />
          </v-card-actions>
        </v-card>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'filter-station',
  props: {
    controller: {
      type: Object,
      required: true,
    },
  },

  watch: {
    'controller.stationsTypesSelected'() {
      this.controller.change()
    },
  },

  mounted() {
    this.controller.contextFilter = this
  },
}
</script>

<style>
#filter {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
  min-width: 250px;
}
</style>
