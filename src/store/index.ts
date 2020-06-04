import Vue from 'vue';
import Vuex from 'vuex';
import CountryOptions from '@/constants/countries';
import Travel from '@/constants/travel';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    country: null,
    countryOptions: CountryOptions.sort((a, b) => a.name.localeCompare(b.name)),
    travelContext: 'inbound',
    Travel,
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
    getCountryById(state) {
      return (id: string) => state.countryOptions.find((country) => country.id === id);
    },
  },
});
