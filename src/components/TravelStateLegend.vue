<template>
  <div class="inline-flex md:flex-col flex-wrap">
    <TravelStateBadge travelState="selected"
      class="mr-1 md:mr-0 text-xs md:text-sm mb-1"/>
    <TravelStateBadge travelState="yes"
      class="mr-1 md:mr-0 text-xs md:text-sm mb-1"/>
    <TravelStateBadge travelState="partial"
      class="mr-1 text-xs md:mr-0 md:text-sm mb-1"/>
    <TravelStateBadge travelState="no"
      class="mr-1 md:mr-0 text-xs md:text-sm mb-1"/>
    <TravelStateBadge travelState="unknown"
      class="md:mb-0 mr-1 md:mr-0 text-xs md:text-sm mb-1"/>
  </div>
</template>

<script>
export default {
  name: 'TravelStateLegend',
};
</script>

<style lang="scss">
.badge {
  @apply py-0.5 px-2.5 mb-1 mr-1 text-xs text-gray-800 text-center rounded-md;
  @screen md { @apply mr-0 text-sm };
  &:last-child {
    @screen md { @apply mb-0 };
  }
 };
</style>
