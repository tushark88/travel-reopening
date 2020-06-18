<template>
  <div class="inline-flex md:flex-col flex-wrap">
    <div class="badge badge-selected">Selected</div>
    <div class="badge badge-yes">Open</div>
    <div class="badge badge-partial">Partially open</div>
    <div class="badge badge-no">Closed</div>
    <div class="badge badge-unknown">Unknown</div>
  </div>
</template>

<script>
export default {
  name: 'TravelStateLegend',
};
</script>

<style lang='scss'>
 .badge {
   @apply py-0.5 px-2.5 mb-1 mr-1 text-xs text-gray-800 text-center rounded-md;
   @screen md { @apply mr-0 text-sm };
 };
</style>
