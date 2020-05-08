import setlistService from "@/service/setlist";

const actions = {
  fetchSetlists: async ({ commit, dispatch }) => {
    try {
      const { data } = await setlistService.getSetlists();
      commit("UPDATE_SETLISTS", data);
      commit("UPDATE_ARTISTS", data);
      //return Promise.resolve(data);
      return true;
    } catch (err) {
      //return Promise.reject('Could not load setlist information');
      return false;
    } finally {
      dispatch("appState/toggleLoading", false, { root: true })
    }
  }
};

const mutations = {
  UPDATE_SETLISTS(state, data) {
    state.setlists = data;
  },
  UPDATE_ARTISTS(state, data) {
    state.artists = getArtists(data);
  }
};

const getters = {
  getTotalConcerts: state => state.setlists.length,
  getShow: state => id => {
    return Object.values(state.setlists).find(element => element.id === id);
  },
  getArtist: state => mbid => {
    const data = Object.values(state.setlists).find(
      element => element.artist.mbid === mbid
    );
    if (data && Object.prototype.hasOwnProperty.call(data, "artist")) {
      return data.artist;
    }

    return null;
  },
  getArtists: state => {
    const artists = getArtists(state.setlists);

    return Object.values(artists).sort((a, b) => (a.name > b.name ? 1 : -1));
  },
  getArtistShows: state => mbid => {
    return state.setlists.reduce((ac, setlist) => {
      if (setlist.artist.mbid === mbid) {
        ac.push(setlist);
      }

      return ac;
    }, []);
  },
  getTopArtists: state => {
    const artists = Object.values(state.artists).sort((a, b) =>
      a.qty < b.qty ? 1 : -1
    );
    return artists.slice(0, 6);
  },
  getTotalArtists: state => Object.keys(state.artists).length,
  getYearlyConcerts: state => {
    return state.setlists.reduce((ac, setlist) => {
      const dateSplit = setlist.eventDate.split("-");
      const year = parseInt(dateSplit[2]);

      if (Object.prototype.hasOwnProperty.call(ac, year)) {
        const merge = [...ac[year], setlist];
        return { ...ac, [year]: merge };
      }

      return { ...ac, [year]: [setlist] };
    }, {});
  },
  getTotalCountries: state => {
    const countries = state.setlists.reduce((ac, setlist) => {
      const country = setlist.venue.city.country.code;
      const qty = Object.prototype.hasOwnProperty.call(ac, country)
        ? ac[country] + 1
        : 1;

      return { ...ac, [country]: qty };
    }, {});

    return Object.keys(countries).length;
  }
};

const state = () => ({
  setlists: [],
  isLoading: true
});

const getArtists = setlists => {
  return setlists.reduce((ac, setlist) => {
    setlist.artist.qty = Object.prototype.hasOwnProperty.call(
      ac,
      setlist.artist.mbid
    )
      ? ac[setlist.artist.mbid].qty + 1
      : 1;

    return { ...ac, [setlist.artist.mbid]: setlist.artist };
  }, {});
};

export default {
  namespaced: true,
  getters,
  actions,
  state,
  mutations
};
