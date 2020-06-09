<template>
  <div v-if="!!this.content">
    <vue-markdown :source="content"></vue-markdown>
  </div>
  <div v-else>
    <p>Sorry, we don't have any information about his region.</p>
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
