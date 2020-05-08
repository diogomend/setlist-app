<template>
  <div class="show-details">
    <template v-if="!artist">
      <h2>No Artist Information Available</h2>
    </template>
    <template v-else>
      <v-layout wrap="wrap">
        <v-flex xs12 sm6 md4>
          <artist-card :name="artist.name" :mbid="artist.mbid" />
        </v-flex>
        <v-flex xs-12 sm6 md8 class="shows-table">
          <v-card max-width="450" class="mx-auto">
            <v-toolbar color="deep-orange darken-1" dark>
              <v-toolbar-title>Shows</v-toolbar-title>

              <v-spacer></v-spacer>

              <v-btn icon>
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
            </v-toolbar>

            <v-list three-line>
              <v-list-item
                v-for="(setlist, index) in setlists"
                ripple
                :key="index"
                :to="{ name: 'ShowInfo', params: { id: setlist.id } }"
              >
                <v-list-item-avatar>
                  {{ getYear(setlist.eventDate) }}
                </v-list-item-avatar>
                <v-list-item-content class="text-left">
                  <v-list-item-title
                    v-html="setlist.venue.name"
                  ></v-list-item-title>
                  <v-list-item-subtitle>
                    {{ setlist.venue.city.name }},
                    {{ setlist.venue.city.country.name }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-flex>
      </v-layout>
    </template>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ArtistCard from "@/components/ArtistCard";
export default {
  name: "ArtistDetails",
  components: {
    ArtistCard
  },
  methods: {
    getYear(eventDate) {
      return eventDate.split("-").reverse()[0];
    }
  },
  computed: {
    ...mapGetters({
      getShow: "setlist/getShow",
      getArtistShows: "setlist/getArtistShows"
    }),
    setlists() {
      return this.getArtistShows(this.$router.history.current.params.mbid);
    },
    artist() {
      if (this.setlists && this.setlists.length > 0) {
        return this.setlists[0].artist;
      }

      return null;
    },
    showDetails() {
      return this.getShow(this.$router.history.current.params.id);
    }
  }
};
</script>

<style scoped lang="scss">
.shows-table {
  margin-top: 64px;
  @media screen and (min-width: 600px) {
    margin-top: 20px;
  }
}
</style>
