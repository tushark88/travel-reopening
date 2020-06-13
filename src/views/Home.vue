<template>
  <TitleMapSelect/>
</template>

<script>
import TitleMapSelect from '@/components/TitleMapSelect.vue';

export default {
  name: 'Home',
  components: { TitleMapSelect },
  mounted() {
    this.$nextTick(() => document.dispatchEvent(new Event('render-completed')));
  },
};
</script>
