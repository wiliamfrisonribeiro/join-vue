<template>
  <v-card width="500" class="text-center popup-container">
    <v-card-title class="headline grey lighten-2"
      >Dados da Estação</v-card-title
    >
    <v-card-text class="popup-container">
      <v-container fluid class="popup-container">
        <v-row align="center" class="popup-container mb-n7">
          <v-col class="d-flex" cols="12">
            <v-btn outlined color="black">
              <label>Identificador: </label
              ><strong class="overlay-text" id="feature-id"></strong><br />
            </v-btn>
            <v-spacer />
            <v-btn outlined color="black">
              <label>Nome: </label
              ><strong class="overlay-text" id="feature-name"></strong>
            </v-btn>
          </v-col>
          <v-col class="d-flex" cols="12">
            <v-btn outlined color="black" block>
              <label>Latitude:</label>
              <strong class="overlay-text" id="feature-latitude"></strong>
            </v-btn>
          </v-col>
          <v-col class="d-flex" cols="12">
            <v-btn outlined color="black" block>
              <label>Longitude:</label
              ><strong class="overlay-text" id="feature-longitude"></strong>
            </v-btn>
          </v-col>
          <v-col class="d-flex" cols="12">
            <v-btn outlined color="black">
              <label>Elevação:</label
              ><strong class="overlay-text" id="feature-elevation"></strong>
            </v-btn>
            <v-spacer />
            <v-btn outlined color="black">
              <label>Tipo de Estação:</label
              ><strong class="overlay-text" id="feature-type"></strong>
            </v-btn>
          </v-col>
          <v-col class="d-flex" cols="12">
            <v-btn outlined color="black" block>
              <label>Inicio de Operação:</label
              ><strong class="overlay-text" id="feature-start"></strong>
            </v-btn>
          </v-col>
          <v-col class="d-flex" cols="12">
            <v-btn outlined color="black" block>
              <label>Fim de Operação:</label
              ><strong class="overlay-text" id="feature-end"></strong>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'Form',
}
</script>
