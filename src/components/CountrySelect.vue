<template>
  <div class="country-select">
    <multiselect
      label="name"
      :value="country"
      :options="countryOptions"
      open-direction="below"
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

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style>
.multiselect__option--highlight,
.multiselect__option--highlight:after {
  background-color: #1c355e;
}

.multiselect__option--selected.multiselect__option--highlight,
.multiselect__option--selected.multiselect__option--highlight:after {
  background-color: #d50037;
}
</style>
