<template>
  <div v-if="state" class="my-4 sm:my-6 md:md-8">
    <h3>Travel Status</h3>
    <div class="inline-grid grid-flow-row grid-cols-2 row-gap-2 col-gap-4">
      <span>Domestic</span>
      <span
        :class="travelStateLabelColor(state.domestic)"
        class="w-20 py-0.5 rounded-md text-center">
        {{ travelStateLabel(state.domestic) }}
      </span>
      <span>Entry</span>
      <span
        :class="travelStateLabelColor(state.inbound)"
        class="w-20 py-0.5 rounded-md text-center">
        {{ travelStateLabel(state.inbound) }}
      </span>
      <span>Exit</span>
      <span
        :class="travelStateLabelColor(state.outbound)"
        class="w-20 py-0.5 rounded-md text-center">
        {{ travelStateLabel(state.outbound) }}
      </span>
    </div>
  </div>
</template>

<script>
import { OpenStatus } from '@/constants/travel';
import { mapGetters } from 'vuex';

export default {
  name: 'TravelState',
  computed: {
    ...mapGetters(['getCountryGlobalState']),
    state() {
      return this.getCountryGlobalState(this.country.code);
    },
  },
  methods: {
    travelStateLabelColor(state) {
      if (state) { return `badge-${state}`; }
      return 'badge-unknown';
    },
    travelStateLabel(state) {
      switch (state) {
        case OpenStatus.Open: return 'Open';
        case OpenStatus.Closed: return 'Closed';
        case OpenStatus.Partial: return 'Partial';
        default: return 'Unknown';
      }
    },
  },
  props: {
    country: Object,
  },
};
</script>
