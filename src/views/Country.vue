<template>
  <div class="country">
    <h1>We list country-based details here about {{currentCoutry.name}}</h1>
    <vue-markdown :source="content"></vue-markdown>
  </div>
</template>

<script>
import CountryOptions from '@/constants/countries';
import axios from 'axios';
import VueMarkdown from 'vue-markdown';

export default {
  name: 'Country',
  components: {
    'vue-markdown': VueMarkdown,
  },
  data() {
    return {
      country: null,
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
      return axios.get(`/data/${this.currentCoutry.code}.md`).then((response) => {
        this.content = response.data;
      });
    },
  },
  created() {
    this.fetchData();
  },
};
</script>
