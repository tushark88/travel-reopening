<!-- eslint-disable max-len -->
<template>
  <div @click="toggleContextAction" :class="{ active }" class="relative border rounded-full cursor-pointer">
    <div class="slider absolute left-0 h-full w-2/4 bg-gray-100 border border-primary rounded-full duration-300 ease-linear"></div>
    <div class="relative z-20 flex">
      <div class="label w-20 px-3 py-2 text-sm text-center uppercase ease-linear text-primary">To</div>
      <div class="label w-20 px-3 py-2 text-sm text-center uppercase ease-linear text-gray-600">From</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'CountrySelect',
  computed: mapState({
    ...mapState(['travelContext']),
    active() { return this.travelContext !== 'inbound'; },
  }),
  methods: {
    ...mapActions(['toggleContextAction']),
  },
};
</script>

<style lang="scss">
.active {
  .slider { left: 50%; }
  .label:first-child { @apply text-gray-600; }
  .label:last-child { @apply text-primary; }
}
</style>
