<template>
  <div class="app-bar-wrapper">
    <v-app-bar fixed dark>
      <v-app-bar-nav-icon @click="toggleDrawer(true)"></v-app-bar-nav-icon>
      <v-btn v-if="isMobile" @click="$router.go(-1)" icon>
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title>Diogo Mendonça</v-toolbar-title>
    </v-app-bar>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import mobileMixin from "@/mixins/mobileMixin";
export default {
  name: "AppBar",
  mixins: [mobileMixin],
  methods: {
    ...mapActions("appState", ["toggleDrawer"])
  }
};
</script>
