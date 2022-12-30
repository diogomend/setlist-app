<template>
  <v-card class="mx-auto mt-5" max-width="600" dark :to="linkUrl">
    <v-img
      class="white--text align-end"
      height="250px"
      :src="image"
      :lazy-src="preview"
      transition="false"
      aspect-ratio="1"
      :key="mbid"
    >
      <v-card-title color="deep-orange lighten-1">{{ name }}</v-card-title>
    </v-img>
    <v-card-text class="text--primary">
      <slot name="content">
        <v-layout row wrap class="text-left">
          <v-flex class="align-self-center ml-5">
            <div class="top-bands-attended">
              Attended <b>{{ totalShows }}</b> times
            </div>
          </v-flex>
        </v-layout>
      </slot>
    </v-card-text>
  </v-card>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "ArtistCard",
  props: {
    name: {
      type: String,
      required: true
    },
    mbid: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: false,
      default: "#967355"
    },
    to: {
      type: String,
      required: false
    }
  },
  computed: {
    ...mapGetters({
      artistShows: "setlist/getArtistShows"
    }),
    totalShows() {
      return this.artistShows(this.mbid).length;
    },
    image() {
      return `${process.env.VUE_APP_API}fanart/${this.mbid}.png`;
    },
    preview() {
      return `${process.env.VUE_APP_API}fanart/${this.mbid}.png?preview=true`;
    },
    linkUrl() {
      if (this.to) {
        return this.to;
      }

      return `/artists/${this.mbid}`;
    }
  }
};
</script>

<style scoped lang="scss">
/deep/ .v-responsive__sizer {
  min-height: 100%;
  background: rgba(0, 0, 0, 0.2);
}

/deep/ .v-card__title {
  background: linear-gradient(
    to top,
    rgba(30, 30, 30, 1) 30%,
    rgba(0, 0, 0, 0)
  );
  font-size: 23px;
  word-break: break-word;
}

a.theme--dark.v-card.v-card {
  margin: 0;

  @media screen and (min-width: 600px) and (max-width: 959px) {
    margin-bottom: 0 !important;
  }
}

/deep/ .v-image__image--cover {
  background-position: top center !important;
}
</style>
