<template>
  <div class="home">
    <multiselect
      v-model="country"
      label="name"
      :options="countryOptions">
    </multiselect>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect';
import CountryOptions from '@/constants/countries';

export default {
  name: 'CountrySelect',
  components: { Multiselect },
  data() {
    return {
      country: null,
      countryOptions: CountryOptions,
    };
  },
  watch: {
    country(val) { this.$router.push(`/${val.code}`); },
  },
};
</script>
