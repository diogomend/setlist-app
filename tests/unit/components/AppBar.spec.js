import Vue from "vue";
import { shallowMount } from "@vue/test-utils";
import AppBar from "@/components/AppBar";
import Vuetify from "vuetify";

Vue.use(Vuetify);

describe("AppBar.vue", () => {
  it("is a Vue instance", () => {
    const wrapper = shallowMount(AppBar);

    const template = wrapper.html();
    expect(template).toMatchSnapshot();
  });
});
