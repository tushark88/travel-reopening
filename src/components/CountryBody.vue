<template>
  <div>
    <slot />
    <div v-if="!!this.content">
      <vue-markdown :source="content"></vue-markdown>
    </div>
    <div v-else>
      <p>
        Oops...sorry, we don't have information at the moment.
        Help us improve this data by dropping us
        <a href="mailto:travel-map@tourhero.com?subject=Travel+Map+Update">an email</a>.
        Thank you very much for your help!
      </p>
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
