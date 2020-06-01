<template>
  <div class="country">
    <h1>What to know when traveling to {{currentCoutry.name}}</h1>
    <CountryBody :content="this.content"></CountryBody>
  </div>
</template>

<script>
import CountryOptions from '@/constants/countries';
import axios from 'axios';
import CountryBody from '@/components/CountryBody.vue';

export default {
  name: 'Country',
  components: {
    CountryBody,
  },
  data() {
    return {
      countryOptions: CountryOptions,
      content: null,
    };
  },
  computed: {
    currentCoutry() {
      return CountryOptions.find(({ code }) => code === this.$route.params.country);
    },
  },
  methods: {
    fetchData() {
      return axios.get(`/data/${this.currentCoutry.code}.md`)
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
  mounted() {
    this.fetchData();
  },
  watch: {
    currentCoutry() { this.fetchData(); },
  },
};
</script>
