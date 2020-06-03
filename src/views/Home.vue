<template>
  <div class="home">
    <WorldMap/>
    <CountrySelect/>
  </div>
</template>

<script>
import CountrySelect from '@/components/CountrySelect.vue';
import WorldMap from '@/components/WorldMap.vue';

export default {
  name: 'Home',
  components: { CountrySelect, WorldMap },
};
</script>
