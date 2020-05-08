import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";

Vue.use(Vuetify);

const opts = {
  icons: {
    iconfont: "md"
  },
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: "#ff7597",
        secondary: "#b0bec5",
        accent: "#ff0266",
        error: "#b71c1c"
      }
    }
  }
};

export default new Vuetify(opts);
