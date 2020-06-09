<!-- eslint-disable max-len -->
<template>
  <div @click="toggleContextAction" class="relative border rounded-full">
    <div
      :class="isOn ? 'slider--right' : 'slider--left'"
      class="slider absolute z-10 w-2/4 overflow-hidden bg-tertiary rounded-full transition-all duration-300 ease-linear"></div>
    <div class="relative z-20 flex">
      <div
        :class="isOn ? 'text-gray-900' : 'text-white'"
        class="w-20 px-3 py-2 text-sm text-center uppercase tracking-wide focus:outline-none">To
      </div>
      <div
        :class="isOn ? 'text-white' : 'text-gray-900'"
        class="w-20 px-3 py-2 text-sm text-center uppercase tracking-wide focus:outline-none">From
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'CountrySelect',
  computed: mapState({
    ...mapState(['travelContext']),
    isOn() {
      return this.travelContext === 'inbound';
    },
  }),
  methods: {
    ...mapActions(['toggleContextAction']),
  },
};
</script>

<style>
  .slider {
    top: 0;
    bottom: 0;
  }
  .slider--left { left: 0; }
  .slider--right { left: 50%; }
</style>
