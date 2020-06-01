<template>
  <div class="home">
    <CountrySelect></CountrySelect>
  </div>
</template>

<script>
import CountrySelect from '@/components/CountrySelect.vue';

export default {
  name: 'Home',
  components: { CountrySelect },
};
</script>
