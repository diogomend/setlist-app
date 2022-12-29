<template>
  <v-app>
    <v-progress-linear
      v-if="isLoading"
      color="deep-orange accent-4"
      indeterminate
      rounded
      height="6"
    ></v-progress-linear>
    <template v-else-if="getTotalConcerts > 0">
      <app-bar v-if="isMobile" />
      <nav-drawer />
      <v-container class="main-container">
        <router-view />
      </v-container>
    </template>
    <template v-else>
      <h3 class="mt-10">Couldn't load Setlist for your account</h3>
    </template>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AppBar from "@/components/AppBar";
import NavDrawer from "@/components/NavDrawer";
import mobileMixin from "@/mixins/mobileMixin";
export default {
  components: {
    AppBar,
    NavDrawer
  },
  mixins: [mobileMixin],
  methods: {
    ...mapActions("setlist", ["fetchSetlists"])
  },
  computed: {
    ...mapGetters({
      isLoading: "appState/getLoading",
      getTotalConcerts: "setlist/getTotalConcerts"
    })
  },
  mounted() {
    this.fetchSetlists();
  }
};
</script>

<style lang="scss">
body .v-card--link:focus:before {
  opacity: 0;
}
.hide-ripple .v-ripple__container,
.v-ripple__container {
  display: none;
}

.relative {
  position: relative;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.container.main-container {
  width: 90%;
  max-width: initial;
  padding-top: 100px;

  @media screen and (min-width: 960px) {
    padding-left: 5%;
  }
}
</style>
