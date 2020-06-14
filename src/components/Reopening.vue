<template>
  <div>
    <h4>Countries Reopening</h4>
    <ul>
      <li v-for="reopening in reopenings" :key="reopening.content">
        <span>{{reopening.date}}:</span>
        <vue-markdown
          :source="reopening.content"
          :anchorAttributes='anchorAttributes'></vue-markdown>
      </li>
    </ul>
  </div>
</template>

<script>
import { futureReopenings } from '@/constants/travel';
import VueMarkdown from 'vue-markdown';

export default {
  name: 'Reopening',
  components: {
    'vue-markdown': VueMarkdown,
  },
  data() {
    return {
      anchorAttributes: { target: '_blank', rel: 'nofollow' },
      reopenings: futureReopenings,
    };
  },
};
</script>
