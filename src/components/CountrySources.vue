<template>
  <div class="panel">
    <div class="panel__inner">
      <h2>Sources</h2>
      <ol v-if="sourcesList.length">
        <li v-for="source in sourcesList" :key="source">
          <vue-markdown
            :source="source"
            :anchorAttributes='anchorAttributes'></vue-markdown>
        </li>
      </ol>
      <p v-else>
        Sorry, we don't have any sources yet.
      </p>
    </div>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown';
import { findSourcesForCountry } from '@/constants/travel';

export default {
  name: 'CountrySources',
  components: {
    VueMarkdown,
  },
  computed: {
    sourcesList() {
      return findSourcesForCountry(this.countryCode)
        .filter((v, i, a) => a.indexOf(v) === i);
    },
  },
  data() {
    return {
      anchorAttributes: { target: '_blank', rel: 'nofollow' },
    };
  },
  props: {
    countryCode: String,
  },
};
</script>
