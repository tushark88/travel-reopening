<template>
  <div class="home">
    <multiselect
      v-model="country"
      :options="countryOptions">
    </multiselect>
  </div>
</template>

<script>
// @ is an alias to /src
import Multiselect from 'vue-multiselect';

export default {
  name: 'Home',
  components: { Multiselect },
  data() {
    return {
      country: null,
      countryOptions: ['Singapore', 'Japan', 'Ukraine', 'United State'],
    };
  },

};
</script>
