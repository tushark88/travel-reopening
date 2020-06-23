<template>
  <div class="main-container">
    <div class="main-container__inner">
      <Subscription/>
    </div>
  </div>
</template>

<script>
import Subscription from '@/components/Subscription.vue';

export default {
  name: 'Subscribe',
  components: { Subscription },
};
</script>
