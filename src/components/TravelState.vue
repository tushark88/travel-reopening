<template>
  <div v-if="state" class="my-4 sm:my-6 md:md-8">
    <h3>Travel Status</h3>
    <div class="w-48">
      <div class="flex flex-col">
        <div class="inline-grid grid-cols-2 grid-col-gap-4 items-baseline pb-1">
          <span>Domestic</span>
          <span
            :class="travelStateLabelColor(state.domestic)"
            class="px-2.5 py-0.5 rounded-md text-center">
            {{ travelStateLabel(state.domestic) }}
          </span>
        </div>
        <div class="inline-grid grid-cols-2 grid-col-gap-4 items-baseline pb-1">
          <span>Travel to</span>
          <span
            :class="travelStateLabelColor(state.inbound)"
            class="px-2.5 py-0.5 rounded-md text-center">
            {{ travelStateLabel(state.inbound) }}
          </span>
        </div>
        <div class="inline-grid grid-cols-2 grid-col-gap-4 items-baseline">
          <span>Travel from</span>
          <span
            :class="travelStateLabelColor(state.outbound)"
            class="px-2.5 py-0.5 rounded-md text-center">
            {{ travelStateLabel(state.outbound) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'TravelState',
  computed: {
    ...mapGetters(['getCountryGlobalState']),
    state() {
      return this.getCountryGlobalState(this.countryCode);
    },
  },
  methods: {
    travelStateLabelColor(state) {
      if (state) { return `badge-${state}`; }
      return 'badge-unknown';
    },
    travelStateLabel(state) {
      switch (state) {
        case 'yes': return 'Open';
        case 'no': return 'Closed';
        case 'partial': return 'Partial';
        default: return 'Unknown';
      }
    },
  },
  props: {
    countryCode: String,
  },
};
</script>
