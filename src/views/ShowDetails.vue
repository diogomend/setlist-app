<template>
  <div class="show-details">
    <template v-if="!showDetails">
      <h2>No show info available</h2>
    </template>
    <template v-else>
      <v-layout wrap="wrap">
        <v-flex xs12 sm6 md4>
          <artist-card
            :name="showDetails.artist.name"
            :mbid="showDetails.artist.mbid"
          />
        </v-flex>
        <v-flex xs-12 sm6 md8>
          <v-card max-width="450" class="mx-auto show-info">
            <v-toolbar color="deep-orange darken-1" dark>
              <v-toolbar-title>Info</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
            </v-toolbar>
            <v-list>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>calendar_today</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="text-left">{{
                    showDetails.eventDate
                  }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>place</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="text-left">
                    {{ showDetails.venue.name }}
                    <p>
                      {{ showDetails.venue.city.name }},
                      {{ showDetails.venue.city.country.name }}
                    </p>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
          <v-card max-width="450" class="mx-auto songs-table">
            <v-toolbar color="deep-orange darken-1" dark>
              <v-toolbar-title>Songs</v-toolbar-title>

              <v-spacer></v-spacer>

              <v-btn icon>
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
            </v-toolbar>

            <v-list>
              <template v-if="showDetails.sets.set[0]">
                <v-list-item
                  v-for="(song, i) in showDetails.sets.set[0].song"
                  :key="i"
                >
                  <v-list-item-content class="text-left">
                    <v-list-item-title v-html="song.name"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>
              <template v-else>
                No songs added to playlist in setlist.fm website
              </template>
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
  name: "ShowDetails",
  components: {
    ArtistCard
  },
  computed: {
    ...mapGetters({
      getShow: "setlist/getShow"
    }),
    showDetails() {
      return this.getShow(this.$router.history.current.params.id);
    }
  }
};
</script>

<style scoped lang="scss">
.songs-table,
.show-info {
  margin-top: 64px;
  @media screen and (min-width: 600px) {
    margin-top: 20px;
  }
}
</style>
