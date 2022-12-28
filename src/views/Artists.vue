<template>
  <div class="artists-list">
    <v-card-title class="deep-orange--text darken-1 display-2"
      >Artists</v-card-title
    >
    <v-layout wrap="wrap">
      <v-flex
        xs12
        sm6
        md4
        v-for="(artist, i) in artists"
        :key="i"
        class="artist-container"
      >
        <artist-card :name="artist.name" :mbid="artist.mbid">
          <div slot="content">
            <v-layout row wrap class="text-left">
              <v-flex class="align-self-center ml-5">
                <div class="top-bands-attended">
                  Attended <b>{{ artist.qty }}</b> times
                </div>
              </v-flex>
            </v-layout>
          </div>
        </artist-card>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import ArtistCard from "@/components/ArtistCard";
export default {
  name: "Artists",
  components: {
    ArtistCard
  },
  computed: {
    ...mapGetters({
      artists: "setlist/getArtists"
    })
  }
};
</script>

<style scoped lang="scss">
.artist-container {
  display: inline-block;
  padding: 0;
  margin: 12px 0;
  @media screen and (min-width: 960px) {
    padding: 16px;
    margin-bottom: 0;
  }
}
</style>
