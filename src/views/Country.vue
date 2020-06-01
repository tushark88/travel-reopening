<template>
  <div class="country">
    <h1>We list country-based details here about {{countryName}}</h1>
  </div>
</template>

<script>
import CountryOptions from '@/constants/countries';

export default {
  name: 'Country',
  data() {
    return {
      country: null,
      countryOptions: CountryOptions,
    };
  },
  computed: {
    currentCoutry() {
      return CountryOptions.find(({ code }) => code === this.$route.params.country);
    },
    countryName() {
      return this.currentCoutry.name;
    },
  },
};
</script>
