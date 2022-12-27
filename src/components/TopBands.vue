<template>
  <div class="top-bands">
    <v-card-title class="deep-orange--text darken-1 text-h3"
      >Top Artists</v-card-title
    >
    <div
      v-for="(artist, i) in getTopArtists"
      :key="i"
      class="top-bands-container col-12 col-xs-6 col-sm-6 col-md-4"
    >
      <artist-card :name="artist.name" :mbid="artist.mbid" :color="colors[i]">
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
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ArtistCard from "@/components/ArtistCard";
export default {
  components: {
    ArtistCard
  },
  data: () => ({
    colors: [
      "#965555",
      "#96556d",
      "#965594",
      "#655596",
      "#558496",
      "#559657",
      "#967355"
    ]
  }),
  computed: {
    ...mapGetters({
      getTopArtists: "setlist/getTopArtists"
    })
  }
};
</script>

<style scoped lang="scss">
.top-bands {
  margin: 48px 0;
}
.top-bands-container {
  display: inline-block;
  padding: 0;
  margin: 12px 0;
  @media screen and (min-width: 960px) {
    padding: 16px;
    margin-bottom: 0;
  }
}

.top-bands-item {
  width: 100%;
  overflow: hidden;
  display: flex;
  background-color: tomato;
  height: 150px;
}

.top-bands-qty {
  font-size: 32px;
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  width: 32px;
}

.top-bands-qty > * {
  display: block;
  text-align: center;
  width: 100%;
}

.top-bands-title {
  flex-grow: 1;
  text-align: left;
}
/deep/ .top-bands-attended {
  font-size: 16px;
  color: #ababab;
}

.top-bands-image {
  width: 50px;
  @media screen and (min-width: 768px) {
    width: 150px;
  }
}
</style>
