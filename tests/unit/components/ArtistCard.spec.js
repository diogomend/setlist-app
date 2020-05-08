import { shallowMount } from "@vue/test-utils";
import Vue from "vue";
import { storeOptions } from "@/store/index";
import ArtistCard from "@/components/ArtistCard";
import Vuex from "vuex";
import Vuetify from "vuetify";

Vue.use(Vuex);
Vue.use(Vuetify);
describe("ArtistCard.vue", () => {
  let store;
  let localVue;

  beforeEach(() => {
    jest.clearAllMocks();
    store = new Vuex.Store(storeOptions);
  });

  it("is a Vue instance", () => {
    const wrapper = shallowMount(ArtistCard, {
      localVue,
      store,
      propsData: {
        name: "MOCK_NAME",
        mbid: "MOCK_MBID"
      }
    });

    const template = wrapper.html();
    expect(template).toMatchSnapshot();
  });
});
