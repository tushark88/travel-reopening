<!-- eslint-disable max-len -->
<template>
  <div class="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto">
      <h1>{{country.name}} Travel - COVID19 Update</h1>
      <p class="w-8/12 m-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit deleniti ab cupiditate necessitatibus autem, error obcaecati possimus.</p>
      <div class="py-4">
        <WorldMap/>
      </div>
      <div class="flex items-center">
        <div class="mr-2">
          <TravelDirectionToggle/>
        </div>
        <CountrySelect/>
      </div>
      <div class="py-8">
        <div class="bg-white overflow-hidden shadow rounded-md">
          <div class="px-4 py-5 sm:p-6">
            <CountryBody :content="this.content"></CountryBody>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import CountryBody from '@/components/CountryBody.vue';
import CountrySelect from '@/components/CountrySelect.vue';
import TravelDirectionToggle from '@/components/TravelDirectionToggle.vue';
import { mapActions, mapGetters, mapState } from 'vuex';
import WorldMap from '@/components/WorldMap.vue';

export default {
  name: 'Country',
  components: {
    CountryBody,
    CountrySelect,
    TravelDirectionToggle,
    WorldMap,
  },
  data() {
    return {
      content: null,
    };
  },
  computed: {
    ...mapState(['country', 'countryOptions']),
    ...mapGetters(['getCountryByCode']),
  },
  methods: {
    ...mapActions(['updateCountryAction']),
    fetchData() {
      const country = this.getCountryByCode(this.$route.params.country);
      this.updateCountryAction(country);

      return axios.get(`/data/${this.country.code}.md`)
        .then((response) => { this.content = response.data; })
        .catch((error) => {
          if (error.response.status === 404) {
            this.content = null;
          } else {
            throw error;
          }
        });
    },
  },
  watch: {
    $route: 'fetchData',
  },
  created() {
    this.fetchData();
  },
  beforeRouteLeave(to, from, next) {
    this.updateCountryAction(null);
    next();
  },
};
</script>
