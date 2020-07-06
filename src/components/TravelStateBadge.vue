<template>
  <span :class="badgeColor">{{badgeLabel}}</span>
</template>

<script>
import { OpenStatus } from '@/constants/travel';

export default {
  name: 'TravelStateBadge',
  computed: {
    badgeColor() {
      if (this.travelState) {
        return `badge badge--${this.travelState}`;
      }
      return 'badge badge--unknown';
    },
    badgeLabel() {
      switch (this.travelState) {
        case OpenStatus.Open: return 'Allowed';
        case OpenStatus.Closed: return 'Restricted';
        case OpenStatus.Partial: return 'Partially allowed';
        default: return 'Unknown';
      }
    },
  },
  props: {
    travelState: String,
  },
};
</script>

<style lang="scss">
.badge {
  @apply py-0.5 px-2.5 text-base text-center rounded-md whitespace-no-wrap;
  &-xs { @apply text-xs }
  &-no {
    @apply bg-secondary;
    @apply text-white;
  }
  &-partial {
    @apply bg-state-partial;
    @apply text-gray-800;
  }
  &-selected {
    @apply bg-primary;
    @apply text-white;
  }
  &-unknown {
    @apply bg-gray-400;
    @apply text-gray-800;
  }
  &-yes {
    @apply bg-state-open;
    @apply text-white;
  }
};
</style>
