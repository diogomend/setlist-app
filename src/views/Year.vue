<template>
  <div class="show-details">
    <template v-if="!shows">
      <h2>No shows info available</h2>
    </template>
    <template v-else-if="shows.length === 0">
      <h2>No information for the selected year</h2>
    </template>
    <template v-else>
      <v-card-title class="deep-orange--text darken-1 display-2 mb-5"
        >{{ year }} Year Review</v-card-title
      >
      <v-flex xs12="xs12">
        <v-layout wrap="wrap" class="px-3 px-sm-10 px-md-3">
          <v-flex xs6>
            <v-card class="text-xs-center">
              <v-card-text>
                <div class="display-1 mb-2">{{ shows.length }}</div>
                Concerts
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs6>
            <v-card class="text-xs-center">
              <v-card-text>
                <div class="display-1 mb-2">{{ getVenues }}</div>
                Venues
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
      <div class="row year-artists-container">
        <div
          v-for="({ artist, eventDate, venue, id }, i) in shows"
          :key="i"
          class="year-artists col-12 col-xs-6 col-sm-6 col-md-4 text-left"
        >
          <artist-card
            :name="artist.name"
            :mbid="artist.mbid"
            :to="`/shows/${id}`"
          >
            <div slot="content">
              <v-layout row wrap class="text-left">
                <v-flex class="align-self-center pa-3 pt-0">
                  <div class="date deep-orange--text">
                    {{ formatDate(eventDate) }}
                  </div>
                  <div class="venue mb-2 mt-1 text-truncate block">
                    {{ venue.name }}
                  </div>
                </v-flex>
              </v-layout>
            </div>
          </artist-card>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ArtistCard from "@/components/ArtistCard";
export default {
  name: "Year",
  components: {
    ArtistCard
  },
  computed: {
    ...mapGetters({
      getShowsByYear: "setlist/getShowsByYear"
    }),
    year() {
      return this.$router.history.current.params.year;
    },
    shows() {
      if (Number.isNaN(this.$router.history.current.params.year)) {
        return;
      }

      return this.getShowsByYear(this.$router.history.current.params.year);
    },
    getVenues() {
      const uniqueVenues = this.shows.reduce((acc, setlist) => {
        acc[setlist.venue.id] = true;
        return acc;
      }, {});

      return Object.keys(uniqueVenues).length;
    },
    monthlyConcerts() {
      const months = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
        10: 0,
        11: 0,
        12: 0
      };

      this.shows.forEach(show => {
        const parse = show.eventDate.split("-");
        months[parseInt(parse[1])] += 1;
      });

      return Object.values(months);
    }
  },
  methods: {
    formatDate(date) {
      const format = date.split("-");
      const dateObj = new Date(format[2], format[1], format[0]);
      const month = dateObj.toLocaleString("default", { month: "long" });
      const day = format[0];
      let suffix =
        (day >= 4 && day <= 20) || (day >= 24 && day <= 30)
          ? "th"
          : ["st", "nd", "rd"][(day % 10) - 1];
      return `${month} ${day}${suffix}`;
    }
  }
};
</script>

<style scoped lang="scss">
.v-card__title {
  word-break: break-word;
  font-size: 32px;
  text-align: center;
  display: block;
  @media screen and (min-width: 960px) {
    text-align: left;
  }
}
.year-artists-container {
  margin: 0 16px;
  @media screen and (min-width: 960px) {
    margin: auto;
  }
}
.year-artists {
  display: inline-block;
  padding: 0;
  margin: 12px 0;
  @media screen and (min-width: 960px) {
    padding: 16px;
    margin-bottom: 0;
    padding-bottom: 0;
  }
}

.date {
  font-size: 18px;
}
</style>
