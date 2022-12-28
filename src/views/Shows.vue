<template>
  <div>
    <v-card-title class="deep-orange--text darken-1 display-2"
      >Shows</v-card-title
    >
    <v-timeline dense clipped>
      <div v-for="(year, index) in years" :key="index">
        <v-timeline-item class="mb-4" hide-dot>
          <v-btn
            large
            color="primary"
            dark
            class="year-link display-3 mt-10"
            :to="`/shows/year/${year}`"
          >
            {{ year }}
          </v-btn>
        </v-timeline-item>
        <div v-for="(concert, i) in getYearlyConcerts[year]" :key="i">
          <div class="timeline-wrapper" ripple @click="viewSet(concert.id)">
            <v-timeline-item small color="deep-orange lighten-1" class="mb-3">
              <v-layout row wrap>
                <v-flex xs12 sm7>
                  <h3 class="font-weight-bold mb-1">
                    {{ concert.artist.name }}
                  </h3>
                  <div>
                    {{ concert.venue.city.name }},
                    {{ concert.venue.city.country.name }}
                  </div>
                </v-flex>
                <v-flex xs12 sm5 text-sm-right text-small>
                  <div class="font-weight-thin mt-2 pr-4">
                    {{ concert.eventDate }}
                  </div>
                </v-flex>
              </v-layout>
            </v-timeline-item>
          </div>
        </div>
      </div>
    </v-timeline>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Shows",
  computed: {
    ...mapGetters({
      getYearlyConcerts: ["setlist/getYearlyConcerts"]
    }),
    years() {
      return Object.keys(this.getYearlyConcerts).reverse();
    }
  },
  methods: {
    viewSet(id) {
      this.$router.push(`/shows/${id}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.v-timeline {
  text-align: left;
  color: #a1a1a1;
}
.timeline-wrapper {
  cursor: Pointer;
  transition: all 100ms ease-in;

  &:hover {
    h3 {
      color: #fbe9e7;
    }
  }
}
h2 {
  color: #ff7043;
}

h3 {
  color: white;
}

.year-link {
  color: #ff7043;
  text-decoration: none;
}
</style>
