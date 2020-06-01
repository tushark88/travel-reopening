<template>
  <div class="country">
    <CountrySelect></CountrySelect>
    <h1>What to know when traveling to {{country.name}}</h1>
    <CountryBody :content="this.content"></CountryBody>
  </div>
</template>

<script>
import axios from 'axios';
import CountryBody from '@/components/CountryBody.vue';
import CountrySelect from '@/components/CountrySelect.vue';
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  name: 'Country',
  components: {
    CountryBody,
    CountrySelect,
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
