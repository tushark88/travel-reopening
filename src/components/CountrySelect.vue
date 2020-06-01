<template>
  <div class="home">
    <multiselect
      label="name"
      :value="country"
      :options="countryOptions"
      @input="updateCountryAction">
    </multiselect>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'CountrySelect',
  components: { Multiselect },
  watch: {
    country(val) {
      const newPath = `/${val.code}`;
      if (this.$route.path !== newPath) {
        this.$router.push(newPath);
      }
    },
  },
  computed: mapState({
    ...mapState(['country', 'countryOptions']),
  }),
  methods: {
    ...mapActions(['updateCountryAction']),
  },
};
</script>
