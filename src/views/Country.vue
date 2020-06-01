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
import { mapState } from 'vuex';

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
    ...mapState(['country']),
  },
  methods: {
    fetchData() {
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
  mounted() {
    this.fetchData();
  },
  watch: {
    country() { this.fetchData(); },
  },
};
</script>
