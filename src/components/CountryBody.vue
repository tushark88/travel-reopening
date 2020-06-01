<template>
  <div class="country-body">
    <div v-if="!!this.content">
      <vue-markdown :source="content"></vue-markdown>
    </div>
    <div v-else>
      Sorry, we don't have any information about his region.
    </div>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown';

export default {
  name: 'CountryBody',
  components: {
    'vue-markdown': VueMarkdown,
  },
  props: {
    content: String,
  },
};
</script>
