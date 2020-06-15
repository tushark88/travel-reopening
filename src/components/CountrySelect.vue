<template>
  <multiselect
    label="name"
    :value="country"
    :options="countryOptions"
    open-direction="below"
    placeholder="Select your country"
    :hideSelected="true"
    @input="updateCountryAction">
  </multiselect>
</template>

<script>
import Multiselect from 'vue-multiselect';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'CountrySelect',
  components: { Multiselect },
  watch: {
    country(val) {
      if (this.$route.params.country === val.code) return;
      this.$router.push({ name: 'Country', params: { country: val.code } });
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
  @apply bg-primary;
}

.multiselect__option--selected.multiselect__option--highlight,
.multiselect__option--selected.multiselect__option--highlight:after {
  @apply bg-secondary;
}

.multiselect__placeholder, .multiselect__input {
  @apply text-base;
  line-height: 1rem;
  padding-left: 5px;
}

</style>
