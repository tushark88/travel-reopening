<template>
  <div class="inline-flex md:flex-col flex-wrap">
    <div class="badge-yes py-0.5 px-2.5 mb-1 mr-1 md:mr-0
      text-xs md:text-sm text-white text-center rounded-md">
      Open
    </div>
    <div class="badge-no py-0.5 px-2.5 mb-1 mr-1 md:mr-0
      text-xs md:text-sm text-white text-center rounded-md">
      Closed
    </div>
    <div class="badge-partial py-0.5 px-2.5 mb-1 mr-1 md:mr-0
      text-xs md:text-sm text-gray-800 text-center rounded-md">
      Partially open
    </div>
    <div class="badge-unknown py-0.5 px-2.5 mb-1 mr-1 md:mr-0
      text-xs md:text-sm text-gray-800 text-center rounded-md">
      Unknown
    </div>
    <div class="badge-selected py-0.5 px-2.5 mb-1 md:mb-0
      text-xs md:text-sm text-white text-center rounded-md">
      Selected
    </div>
  </div>
</template>

<script>
export default {
  name: 'TravelStateLegend',
};
</script>
