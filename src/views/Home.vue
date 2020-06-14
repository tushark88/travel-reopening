<template>
  <div>
    <TitleMapSelect/>
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
      <div class="bg-white overflow-hidden shadow
        rounded-md max-w-4xl mx-auto px-4 py-5 pt-6 pb-4 md:py-6">
        <Reopening/>
      </div>
    </div>
  </div>
</template>

<script>
import Reopening from '@/components/Reopening.vue';
import TitleMapSelect from '@/components/TitleMapSelect.vue';

export default {
  name: 'Home',
  components: { Reopening, TitleMapSelect },
  mounted() {
    this.$nextTick(() => document.dispatchEvent(new Event('render-completed')));
  },
};
</script>
