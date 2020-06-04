<template>
  <div class="country">
    <WorldMap/>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl mx-auto py-8">
        <CountrySelect/>
        <div class="py-8">
          <h1>What to know when traveling to {{country.name}}</h1>
          <CountryBody :content="this.content"></CountryBody>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import CountryBody from '@/components/CountryBody.vue';
import CountrySelect from '@/components/CountrySelect.vue';
import { mapActions, mapGetters, mapState } from 'vuex';
import WorldMap from '@/components/WorldMap.vue';

export default {
  name: 'Country',
  components: {
    CountryBody,
    CountrySelect,
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
};
</script>
