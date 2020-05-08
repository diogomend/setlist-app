import axios from "axios";

axios.defaults.baseURL = process.env.VUE_APP_API;
export default {
  async getSetlists() {
    try {
      const response = await axios.get(
        `setlists/${process.env.VUE_APP_API_USERNAME}`
      );
      return Promise.resolve({
        data: response.data,
        status: response.status
      });
    } catch (err) {
      return Promise.reject();
    }
  }
};
