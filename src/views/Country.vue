<!-- eslint-disable max-len -->
<template>
  <div>
    <TitleMapSelect/>
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white overflow-hidden shadow rounded-md max-w-4xl mx-auto px-4 py-5 pt-6 pb-4 md:py-6">
        <h2>{{country.name}} COVID-19 Travel Update</h2>
        <p>Follow news and updates of current travel restrictions and reopening timelines for {{country.name}}.</p>
        <CountryBody :content="this.content"></CountryBody>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import CountryBody from '@/components/CountryBody.vue';
import TitleMapSelect from '@/components/TitleMapSelect.vue';
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  name: 'Country',
  components: {
    CountryBody,
    TitleMapSelect,
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
