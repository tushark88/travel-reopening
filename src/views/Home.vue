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
// @ is an alias to /src
import Multiselect from 'vue-multiselect';
import CountryOptions from '@/constants/countries';

export default {
  name: 'Home',
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
