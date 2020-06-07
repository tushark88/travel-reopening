import Vue from 'vue';
import Vuex from 'vuex';
/* eslint-disable-next-line @typescript-eslint/ban-ts-ignore */
// @ts-ignore
import * as CountryOptions from '@/constants/countries';
import Travel from '@/constants/travel';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    country: null,
    countryOptions: CountryOptions.sort((a: any, b: any) => a.name.localeCompare(b.name)),
    travelContext: 'inbound',
    Travel,
  },
  mutations: {
    updateCountry(state, country) {
      state.country = country;
    },
    toggleContext(state) {
      const context = state.travelContext === 'inbound' ? 'outbound' : 'inbound';
      state.travelContext = context;
    },
  },
  actions: {
    updateCountryAction({ commit }, country) {
      commit('updateCountry', country);
    },
    toggleContextAction({ commit }) {
      commit('toggleContext');
    },
  },
  modules: {
  },
  getters: {
    getCountryByCode(state) {
      return (code: string) => state.countryOptions.find((country: any) => country.code === code);
    },
    getCountryById(state) {
      return (id: string) => state.countryOptions.find((country: any) => country.id === id);
    },
    getCountryState(state) {
      return (code: string, direction: string, currentCountry: any) => {
        if (currentCountry && direction === 'inbound') {
          const currentCountryTravel = state.Travel.countries[currentCountry.code]?.travel;
          if (currentCountryTravel && 'inbound_allowed' in currentCountryTravel) {
            return currentCountryTravel.inbound_allowed.includes(code) ? 'open' : 'closed';
          }
          return currentCountryTravel?.inbound;
        }
        if (currentCountry && direction === 'outbound') {
          const countryTravel = state.Travel.countries[code]?.travel;
          if (countryTravel && 'inbound_allowed' in countryTravel) {
            return countryTravel.inbound_allowed.includes(currentCountry.code) ? 'open' : 'closed';
          }
          return countryTravel?.outbound;
        }
        return state.Travel.countries[code]?.travel[direction];
      };
    },
  },
});
