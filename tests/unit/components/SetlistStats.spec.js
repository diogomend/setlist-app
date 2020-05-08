import { shallowMount } from "@vue/test-utils";
import Vue from "vue";
import { storeOptions } from "@/store/index";
import SetlistStats from "@/components/SetlistStats";
import Vuex from "vuex";
import Vuetify from "vuetify";

Vue.use(Vuex);
Vue.use(Vuetify);
describe("SetlistStats.vue", () => {
  let store;
  let localVue;

  beforeEach(() => {
    jest.clearAllMocks();
    storeOptions.modules.setlist.state = {
      setlists: [
        {
          eventDate: "20-06-2016",
          venue: {
            city: { country: { code: "PT" } }
          }
        }
      ],
      artists: {}
    };
    store = new Vuex.Store(storeOptions);
  });

  it("is a Vue instance", () => {
    const wrapper = shallowMount(SetlistStats, {
      localVue,
      store
    });

    const template = wrapper.html();
    expect(template).toMatchSnapshot();
  });

  it("should return number of concerts in current year", async () => {
    const mockDate = new Date(1466424490000);
    jest.spyOn(global, "Date").mockImplementation(() => mockDate);
    const wrapper = shallowMount(SetlistStats, {
      localVue,
      store
    });

    expect(wrapper.vm.currentYear.length).toEqual(1);
  });
});
