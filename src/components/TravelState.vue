<template>
  <div v-if="state" class="my-4 sm:my-6 md:my-8">
    <h3>Travel Status</h3>
    <div class="inline-grid grid-cols-legend row-gap-2 col-gap-4">
      <span>Domestic</span>
      <span
        :class="travelStateLabelColor(state.domestic)"
        class="flex items-center justify-center px-2.5 py-0.5 text-center rounded-md">
        {{ travelStateLabel(state.domestic) }}
      </span>
      <span>Entry</span>
      <span
        :class="travelStateLabelColor(state.inbound)"
        class="flex items-center justify-center px-2.5 py-0.5 text-center rounded-md">
        {{ travelStateLabel(state.inbound) }}
      </span>
      <span>Exit</span>
      <span
        :class="travelStateLabelColor(state.outbound)"
        class="flex items-center justify-center px-2.5 py-0.5 text-center rounded-md">
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
        case OpenStatus.Open: return 'Allowed';
        case OpenStatus.Closed: return 'Restricted';
        case OpenStatus.Partial: return 'Partially allowed';
        default: return 'Unknown';
      }
    },
  },
  props: {
    country: Object,
  },
};
</script>
