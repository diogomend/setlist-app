import appState from "@/store/appState";

describe("appState mutations", () => {
    it("expects TOGGLE_DRAWER to change drawer state", () => {
      const state = {
        drawer: false
      };
      appState.mutations.TOGGLE_DRAWER(state, true);
      expect(state.drawer).toBeTruthy();
    });
  
    it("expects TOGGLE_LOADING to change loading state", () => {
      const state = {
        isLoading: true
      };
      appState.mutations.TOGGLE_LOADING(state, false);
      expect(state.isLoading).toBeFalsy();
    });
});

describe("appState actions", () => {
    it("expects toggleDrawer to commit TOGGLE_DRAWER mutation", () => {
      const commit = jest.fn();
      appState.actions.toggleDrawer({ commit }, true);
      expect(commit).toHaveBeenCalled();
      expect(commit.mock.calls[0][0]).toBe("TOGGLE_DRAWER");
    });
  
    it("expects toggleLoading to commit TOGGLE_LOADING", () => {
      const commit = jest.fn();
      appState.actions.toggleLoading({ commit }, true);
      expect(commit).toHaveBeenCalled();
      expect(commit.mock.calls[0][0]).toBe("TOGGLE_LOADING");
    });
});

describe("appState getters", () => {
  it("expects getDrawer() to return drawer state", () => {
    const state = {
      drawer: true
    };
    expect(appState.getters.getDrawer(state)).toBeTruthy();
  });

  it("expects getLoading() to return loading state", () => {
    const state = {
      isLoading: true
    };
    expect(appState.getters.getLoading(state)).toBeTruthy();
  });
});