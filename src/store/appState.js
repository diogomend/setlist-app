const actions = {
  toggleDrawer: ({ commit }, toggle) => {
    commit("TOGGLE_DRAWER", toggle);
  },
  toggleLoading: ({ commit }, toggle) => {
    commit("TOGGLE_LOADING", toggle);
  }
};

const mutations = {
  TOGGLE_DRAWER(state, bool) {
    state.drawer = bool;
  },
  TOGGLE_LOADING(state, isLoading) {
    state.isLoading = isLoading;
  }
};

const getters = {
  getDrawer: state => state.drawer,
  getLoading: state => state.isLoading
};

const state = () => ({
  drawer: false,
  isLoading: true
});

export default {
  namespaced: true,
  getters,
  actions,
  state,
  mutations
};
