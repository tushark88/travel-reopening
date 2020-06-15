<template>
  <div class="panel">
    <div class="panel__inner">
      <h2>Countries Reopening</h2>
      <ul>
        <li v-for="reopening in futureReopenings" :key="reopening.content">
          <span>{{reopening.date}}:</span>
          <vue-markdown
            :source="reopening.content"
            :anchorAttributes='anchorAttributes'></vue-markdown>
        </li>
      </ul>
    </div>
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
      futureReopenings,
    };
  },
};
</script>
