import { shallowMount } from "@vue/test-utils";
import Vue from "vue";
import { storeOptions } from "@/store/index";
import NavDrawer from "@/components/NavDrawer";
import Vuex from "vuex";
import Vuetify from "vuetify";

Vue.use(Vuex);
Vue.use(Vuetify);
describe("NavDrawer.vue", () => {
  let store;
  let localVue;

  beforeEach(() => {
    jest.clearAllMocks();
    store = new Vuex.Store(storeOptions);
  });

  it("is a Vue instance", () => {
    const wrapper = shallowMount(NavDrawer, {
      localVue,
      store
    });

    const template = wrapper.html();
    expect(template).toMatchSnapshot();
  });

  it("set drawer should call toggleDrawer with new value", () => {
    const toggleDrawer = jest.fn();
    const wrapper = shallowMount(NavDrawer, {
      localVue,
      store
    });

    wrapper.setMethods({ toggleDrawer });
    expect(wrapper.vm.drawer).toBeFalsy();
    wrapper.vm.drawer = true;
    expect(toggleDrawer).toHaveBeenCalledWith(true);
  });
});
