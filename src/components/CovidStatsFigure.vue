<template>
  <div>
    <strong><slot /></strong>:
    &nbsp;<span>{{latestFigure.value}}</span>
    &nbsp;<span>({{latestFigure.date}})</span>
    <svg />
  </div>
</template>

<script>
import {
  axisBottom, extent, line, select, scaleTime, max, scaleLinear, axisLeft,
} from 'd3';
import moment from 'moment';

export default {
  name: 'CovidStatsFigure',
  props: {
    data: { type: Array, default() { return []; } },
  },
  created() { window.addEventListener('resize', this.handleSizeChange); },
  computed: {
    latestFigure() {
      if (!this.data) { return { value: 'NA', date: 'NA' }; }
      const sorted = (this.data.slice(0) || []) // make copy of array to prevent mutation
        .sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
      const figure = sorted[sorted.length - 1]?.value || 0;
      const date = sorted[sorted.length - 1]?.date;
      const formattedDate = date ? moment(date).format('MMMM D, YYYY') : 'NA';

      return {
        date: formattedDate,
        value: figure.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
      };
    },
  },
  destroyed() { window.removeEventListener('resize', this.handleSizeChange); },
  methods: {
    drawData() {
      const margin = {
        top: 10, right: 0, bottom: 30, left: 0,
      };
      const baseWidth = select(this.$el).style('width').slice(0, -2);
      const width = baseWidth - margin.left - margin.right;
      const height = 100 - margin.top - margin.bottom;

      const svg = select(this.$el).select('svg');
      svg.selectAll('*').remove();

      svg.attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom);


      const x = scaleTime()
        .domain(extent(this.data, (d) => d.date))
        .range([0, width]);

      svg.append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(axisBottom(x));

      // Add Y axis
      const y = scaleLinear()
        .domain([0, max(this.data, ({ value }) => +value)])
        .range([height, 0]);

      svg.append('g')
        .call(axisLeft(y));


      svg.append('path')
        .attr('class', 'stats')
        .datum(this.data)
        .attr('d', line()
          .x((d) => x(d.date))
          .y((d) => y(d.value)));
    },
    handleSizeChange() { this.drawData(); },
  },
  watch: {
    data() { this.drawData(); },
  },
};
</script>

<style lang="scss">
  svg path.stats {
    fill: none;
    stroke: theme("colors.primary");;
  }
</style>
