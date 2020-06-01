import Vue from 'vue';
import Vuex from 'vuex';
import CountryOptions from '@/constants/countries';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    country: null,
    countryOptions: CountryOptions,
  },
  mutations: {
    updateCountry(state, country) {
      state.country = country;
    },
  },
  actions: {
    updateCountryAction({ commit }, country) {
      commit('updateCountry', country);
    },
  },
  modules: {
  },
  getters: {
    getCountryByCode(state) {
      return (code: string) => state.countryOptions.find((country) => country.code === code);
    },
  },
});
