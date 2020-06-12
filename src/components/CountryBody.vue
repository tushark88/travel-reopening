<template>
  <div v-if="!!this.content">
    <vue-markdown :source="content"></vue-markdown>
  </div>
  <div v-else>
    <p>Oops...sorry, we don't have information about this country at the moment. Help us improve this data by dropping us <a href="mailto:travel-map@tourhero.com?subject=Travel Map Update">an email</a>. Thank you very much for your help!</p>
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
