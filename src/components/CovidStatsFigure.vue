<template>
  <div>
    <strong><slot /></strong>:&nbsp;<span class="cases">{{figure}}</span>
  </div>
</template>

<script>
export default {
  name: 'CovidStatsFigure',
  props: {
    data: Array,
  },
  computed: {
    figure() {
      if (!this.data) { return 0; }
      const sorted = (this.data.slice(0) || []) // make copy of array to prevent mutation
        .sort((a, b) => Date.parse(a[0]) - Date.parse(b[0]));
      const figure = sorted[sorted.length - 1][1] || 0;
      return figure.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    },
  },
};
</script>
