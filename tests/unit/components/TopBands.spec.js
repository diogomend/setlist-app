import { shallowMount } from "@vue/test-utils";
import Vue from "vue";
import { storeOptions } from "@/store/index";
import TopBands from "@/components/TopBands";
import Vuex from "vuex";
import Vuetify from "vuetify";

Vue.use(Vuex);
Vue.use(Vuetify);
describe("TopBands.vue", () => {
  let store;
  let localVue;

  beforeEach(() => {
    jest.clearAllMocks();
    storeOptions.modules.setlist.state = {
      artists: {}
    };
    store = new Vuex.Store(storeOptions);
  });

  it("is a Vue instance", () => {
    const wrapper = shallowMount(TopBands, {
      localVue,
      store
    });

    const template = wrapper.html();
    expect(template).toMatchSnapshot();
  });
});
