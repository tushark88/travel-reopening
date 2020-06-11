<!-- eslint-disable max-len -->
<template>
  <div>
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto py-6">
        <h1>The Ultimate Guide to COVID–19 Travel Restrictions</h1>
        <p class="w-full md:w-8/12 m-0">Borders are slowly reopening as we battle COVID–19. Here you will find the latest information for travel restrictions and guidelines. Travel safe!</p>
      </div>
    </div>
    <div class="bg-warm-gray-50">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto py-6">
          <WorldMap/>
        </div>
      </div>
    </div>
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto py-6">
        <CountrySelect/>
        <div class="pb-6">
          <TravelDirectionToggle/>
        </div>
        <div class="bg-white overflow-hidden shadow rounded-md">
          <div class="px-4 py-5 sm:p-6">
            <h2>{{country.name}} COVID-19 Travel Update</h2>
            <p>Follow news and updates of current travel restrictions and reopening timelines for {{country.name}}.</p>
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
