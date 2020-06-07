<template>
  <button
    v-on:click="toggleContextAction"
    class="btn bg-primary rounded text-white px-4 py-2 hover:bg-primary-light">
    {{buttonLabel}}
  </button>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'CountrySelect',
  computed: mapState({
    ...mapState(['travelContext']),
    buttonLabel() {
      if (this.travelContext === 'inbound') {
        return 'switch to Outbound';
      }
      return 'switch to Inbound';
    },
  }),
  methods: {
    ...mapActions(['toggleContextAction']),
  },
};
</script>
