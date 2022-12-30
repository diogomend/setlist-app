<template>
  <div class="setlist-stats">
    <v-card-title class="deep-orange--text darken-1 display-2 mb-10"
      >Total Stats</v-card-title
    >
    <v-layout wrap="wrap">
      <v-flex xs12="xs12">
        <v-layout wrap="wrap">
          <v-flex xs6 md3>
            <v-card class="text-xs-center" height="100%">
              <v-card-text>
                <div class="display-1 mb-2">
                  <increase-number :number="totalConcerts" />
                </div>
                Concerts
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs6 md3>
            <v-card class="text-xs-center" height="100%">
              <v-card-text>
                <div class="display-1 mb-2">
                  <increase-number :number="totalArtists" />
                </div>
                Artists
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs6 md3>
            <v-card class="text-xs-center" height="100%">
              <v-card-text>
                <div class="display-1 mb-2">
                  <increase-number :number="totalCountries" />
                </div>
                Countries
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs6 md3>
            <v-card class="text-xs-center" height="100%">
              <v-card-text>
                <div class="display-1 mb-2">
                  <increase-number :number="currentYear" />
                </div>
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
import IncreaseNumber from "./IncreaseNumber.vue";
export default {
  name: "SetlistStats",
  components: {
    IncreaseNumber
  },
  computed: {
    ...mapGetters({
      yearlyConcerts: "setlist/getYearlyConcerts",
      totalConcerts: "setlist/getTotalConcerts",
      totalArtists: "setlist/getTotalArtists",
      totalCountries: "setlist/getTotalCountries"
    }),
    currentYear() {
      const year = new Date().getFullYear();

      return typeof this.yearlyConcerts[year] !== "undefined"
        ? this.yearlyConcerts[year].length
        : 0;
    }
  }
};
</script>
