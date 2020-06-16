<template>
  <div>
    <TitleMapSelect/>
    <div class="main-container">
      <div class="main-container__inner">
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
