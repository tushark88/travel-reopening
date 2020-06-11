<!-- eslint-disable max-len -->
<template>
  <div @click="toggleContextAction"
    :class="isOn ? 'slider-left' : 'slider-right'"
    class="relative border rounded-full">
    <div class="slider absolute z-10 w-2/4 overflow-hidden bg-gray-100 border border-primary rounded-full transition-all duration-300 ease-linear"></div>
    <div class="relative z-20 flex">
      <div class="w-20 px-3 py-2 text-sm text-center uppercase tracking-wide focus:outline-none">To
      </div>
      <div class="w-20 px-3 py-2 text-sm text-center uppercase tracking-wide focus:outline-none">From
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

<style lang="scss">
.slider {
  top: -1px;
  bottom: -1px;
}

.slider-left {
  .slider { left: 0; }
  div:nth-of-type(2) div:first-child {
    @apply text-primary;
  }
  div:nth-of-type(2) div:last-child {
    @apply text-gray-600;
  }
}

.slider-right {
  .slider { left: 50%; }
  div:nth-of-type(2) div:first-child {
    @apply text-gray-600;
  }
  div:nth-of-type(2) div:last-child {
    @apply text-primary;
  }
}
</style>
