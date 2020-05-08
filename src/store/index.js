import Vue from "vue";
import Vuex from "vuex";
import setlist from "@/store/setlist";
import appState from "@/store/appState";

Vue.use(Vuex);

export const storeOptions = {
  modules: {
    setlist,
    appState
  }
};

export default new Vuex.Store(storeOptions);
