<template>
  <div v-if="state" class="my-4 sm:my-6 md:my-8">
    <h3>Travel Status</h3>
    <div class="inline-grid grid-cols-legend row-gap-2 col-gap-4 items-baseline">
      <span>Domestic</span>
      <TravelStateBadge :travelState="state.domestic" />
      <span>Entry</span>
      <TravelStateBadge :travelState="state.inbound" />
      <span>Exit</span>
      <TravelStateBadge :travelState="state.outbound" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import TravelStateBadge from '@/components/TravelStateBadge.vue';

export default {
  name: 'TravelState',
  components: { TravelStateBadge },
  computed: {
    ...mapGetters(['getCountryGlobalState']),
    state() {
      return this.getCountryGlobalState(this.country.code);
    },
  },
  props: {
    country: Object,
  },
};
</script>
