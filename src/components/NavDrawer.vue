<template>
  <v-navigation-drawer
    v-model="drawer"
    fixed
    :expand-on-hover="!isMobile"
    :temporary="isMobile"
    :mini-variant="!isMobile"
    :permanent="!isMobile"
  >
    <v-list nav>
      <v-list-item two-line :class="!isMobile && 'px-0'">
        <v-list-item-avatar>
          <img src="@/assets/avatar.jpeg" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>Diogo Mendonça</v-list-item-title>
          <v-list-item-subtitle>My Setlists</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <v-list-item-group v-model="group" active-class="text--accent-4">
        <v-list-item
          v-for="(page, index) in pages"
          :key="index"
          :to="page.link"
        >
          <v-list-item-icon>
            <v-icon>{{ page.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ page.text }}</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import mobileMixin from "@/mixins/mobileMixin";
export default {
  name: "NavDrawer",
  mixins: [mobileMixin],
  data() {
    return {
      group: true,
      pages: [
        {
          icon: "home",
          text: "Home",
          link: "/"
        },
        {
          icon: "timeline",
          text: "Shows",
          link: "/shows"
        },
        {
          icon: "person",
          text: "Artists",
          link: "/artists"
        }
      ]
    };
  },
  computed: {
    drawer: {
      get() {
        return this.$store.state.appState.drawer;
      },
      set(value) {
        this.toggleDrawer(value);
      }
    },
    ...mapGetters({
      isOpened: "setlist/isLoading"
    })
  },
  methods: {
    ...mapActions("appState", ["toggleDrawer"])
  }
};
</script>

<style scoped>
.v-navigation-drawer--absolute {
  z-index: 10;
}
</style>
