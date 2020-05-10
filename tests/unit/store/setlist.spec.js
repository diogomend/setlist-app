import setlist from "@/store/setlist";
import axios from "axios";
import flushPromises from "flush-promises";

jest.mock("axios");
describe("setlist mutations", () => {
  it("expects UPDATE_SETLISTS to change setlists state", () => {
    const state = {
      setlists: []
    };
    setlist.mutations.UPDATE_SETLISTS(state, "MOCK");
    expect(state.setlists).toEqual("MOCK");
  });

  it("expects UPDATE_ARTISTS to change artists state", () => {
    const setlists = [
      {
        artist: {
          mbid: "123"
        }
      }
    ];
    const state = {
      setlists: [],
      artists: []
    };
    setlist.mutations.UPDATE_ARTISTS(state, setlists);
    expect(Object.keys(state.artists)).toEqual(["123"]);
  });
});

describe("setlist actions", () => {
  let commit = jest.fn();
  let dispatch = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("expects fetchSetlists to commit correct mutations", async () => {
    axios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: {}
      })
    );

    setlist.actions.fetchSetlists({ commit, dispatch });
    await flushPromises();
    expect(commit).toHaveBeenCalled();
    expect(commit.mock.calls[0][0]).toBe("UPDATE_SETLISTS");
    expect(commit.mock.calls[1][0]).toBe("UPDATE_ARTISTS");
    expect(dispatch).toHaveBeenCalled();
  });

  it("expects fetchSetlists to return false and not call commits on error", async () => {
    axios.get.mockImplementationOnce(() => {
      throw new Error();
    });

    setlist.actions.fetchSetlists({ commit, dispatch });
    await flushPromises();
    expect(commit).not.toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalled();
  });
});

describe("appState getters", () => {
  it("expects getTotalConcerts() to return length of shows", () => {
    const state = {
      setlists: [{}, {}]
    };
    expect(setlist.getters.getTotalConcerts(state)).toEqual(2);
  });

  it("expects getShow() to return information of existing show", () => {
    const state = {
      setlists: [{ id: 123 }, { id: 321 }]
    };
    expect(setlist.getters.getShow(state)(123)).toEqual({ id: 123 });
  });

  it("expects getArtist() to return information of existing artist", () => {
    const state = {
      setlists: [{ artist: { mbid: 123 } }, { artist: { mbid: 321 } }]
    };
    expect(setlist.getters.getArtist(state)(123)).toEqual({ mbid: 123 });
  });

  it("expects getArtist() to return null if non-existing artist", () => {
    const state = {
      setlists: [{ artist: { mbid: 123 } }, { artist: { mbid: 321 } }]
    };

    expect(setlist.getters.getArtist(state)(555)).toBeNull();
  });

  it("expects getArtists() to return list of artists", () => {
    let state = {
      setlists: [
        { artist: { name: "A", mbid: 123 } },
        { artist: { name: "B", mbid: 321 } },
        { artist: { name: "B", mbid: 321 } }
      ]
    };

    expect(setlist.getters.getArtists(state)).toEqual([
      { mbid: 123, qty: 1, name: "A" },
      { mbid: 321, qty: 2, name: "B" }
    ]);
  });

  it("expects getArtistShows() to return shows of artist", () => {
    const state = {
      setlists: [
        { artist: { name: "A", mbid: 123 } },
        { artist: { name: "B", mbid: 321 } },
        { artist: { name: "B", mbid: 321 } }
      ]
    };

    expect(setlist.getters.getArtistShows(state)(321)).toEqual([
      { artist: { mbid: 321, name: "B" } },
      { artist: { mbid: 321, name: "B" } }
    ]);
  });

  it("expects getTopArtists() to return top artists", () => {
    const state = {
      artists: { 123: { qty: 1 }, 321: { qty: 5 } }
    };

    expect(setlist.getters.getTopArtists(state)).toEqual([
      { qty: 5 },
      { qty: 1 }
    ]);
  });

  it("expects getYearlyConcerts() to return concerts by year", () => {
    const state = {
      setlists: [
        { eventDate: "06-06-2016" },
        { eventDate: "06-06-2018" },
        { eventDate: "06-10-2018" }
      ]
    };

    expect(setlist.getters.getYearlyConcerts(state)).toEqual({
      2016: [{ eventDate: "06-06-2016" }],
      2018: [{ eventDate: "06-06-2018" }, { eventDate: "06-10-2018" }]
    });
  });

  it("expects getTotalCountries() to return concerts by country", () => {
    const state = {
      setlists: [
        { venue: { city: { country: { code: "PT" } } } },
        { venue: { city: { country: { code: "PT" } } } },
        { venue: { city: { country: { code: "GB" } } } }
      ]
    };

    expect(setlist.getters.getTotalCountries(state)).toEqual(2);
  });
});
