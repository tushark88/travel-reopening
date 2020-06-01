<template>
  <div class="country">
    <h1>We list country-based details here about {{currentCoutry.name}}</h1>
    <p>{{rawMarkdown}}</p>
  </div>
</template>

<script>
import CountryOptions from '@/constants/countries';
import axios from 'axios';

export default {
  name: 'Country',
  data() {
    return {
      country: null,
      countryOptions: CountryOptions,
      rawMarkdown: null,
    };
  },
  computed: {
    currentCoutry() {
      return CountryOptions.find(({ code }) => code === this.$route.params.country);
    },
  },
  methods: {
    fetchData() {
      return axios.get(`/data/${this.currentCoutry.code}.md`).then((response) => {
        this.rawMarkdown = response.data;
      });
    },
  },
  created() {
    this.fetchData();
  },
};
</script>
