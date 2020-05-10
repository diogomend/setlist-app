import { createLocalVue, shallowMount } from "@vue/test-utils";
import flushPromises from "flush-promises";
import axios from "axios";
import App from "@/App";
import Vuex from "vuex";
import Vue from "vue";
import Vuetify from "vuetify";
import { storeOptions } from "@/store/index";
Vue.use(Vuetify);
jest.mock("axios");

let localVue = createLocalVue();

describe("App.vue", () => {
  let store = new Vuex.Store(storeOptions);
  it("is a Vue instance", () => {
    const wrapper = shallowMount(App, {
      localVue,
      store,
      sync: false
    });

    const template = wrapper.html();
    expect(template).toMatchSnapshot();
  });

  it("Should show message after bad response", async () => {
    //const fetchSetlists = jest.fn().mockReturnValueOnce({});
    axios.get.mockImplementationOnce(() => Promise.reject());
    const wrapper = shallowMount(App, {
      localVue,
      store,
      methods: {
        //fetchSetlists
      }
    });
    await flushPromises();

    const errorContent = wrapper.find("h3");
    expect(errorContent.text()).toBe("Couldn't load Setlist for your account");
  });

  it("Should show progressbar if state is loading", () => {
    const fetchSetlists = jest.fn().mockReturnValueOnce({});
    shallowMount(App, {
      localVue,
      store,
      methods: {
        fetchSetlists
      }
    });

    expect(fetchSetlists).toHaveBeenCalled();
  });
});
