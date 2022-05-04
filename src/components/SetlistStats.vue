<template>
  <div class="setlist-stats">
    <v-layout wrap="wrap">
      <v-flex xs12="xs12">
        <v-layout wrap="wrap">
          <v-flex xs6 md3>
            <v-card class="text-xs-center" height="100%">
              <v-card-text>
                <div class="display-1 mb-2">{{ totalConcerts }}</div>
                Concerts
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs6 md3>
            <v-card class="text-xs-center" height="100%">
              <v-card-text>
                <div class="display-1 mb-2">{{ totalArtists }}</div>
                Artists
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs6 md3>
            <v-card class="text-xs-center" height="100%">
              <v-card-text>
                <div class="display-1 mb-2">{{ totalCountries }}</div>
                Countries
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs6 md3>
            <v-card class="text-xs-center" height="100%">
              <v-card-text>
                <div class="display-1 mb-2">{{ currentYear }}</div>
                This year
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "SetlistStats",
  computed: {
    ...mapGetters({
      yearlyConcerts: "setlist/getYearlyConcerts",
      totalConcerts: "setlist/getTotalConcerts",
      totalArtists: "setlist/getTotalArtists",
      totalCountries: "setlist/getTotalCountries"
    }),
    currentYear() {
      const year = new Date().getFullYear();
      console.log(this.yearlyConcerts);
      return typeof this.yearlyConcerts[year] !== "undefined"
        ? this.yearlyConcerts[year].length
        : 0;
    }
  }
};
</script>
