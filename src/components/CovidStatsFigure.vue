<template>
  <div>
    <strong><slot /></strong>:&nbsp;<span class='cases'>{{latestFigure}}</span>
    <svg />
  </div>
</template>

<script>
import {
  axisBottom, extent, line, select, scaleTime, max, scaleLinear, axisLeft,
} from 'd3';

export default {
  name: 'CovidStatsFigure',
  props: {
    data: { type: Array, default() { return []; } },
  },
  computed: {
    latestFigure() {
      if (!this.data) { return 0; }
      const sorted = (this.data.slice(0) || []) // make copy of array to prevent mutation
        .sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
      const figure = sorted[sorted.length - 1]?.value || 0;
      return figure.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    },
  },
  methods: {
    drawData() {
      const margin = {
        top: 10, right: 30, bottom: 30, left: 60,
      };
      const width = 460 - margin.left - margin.right;
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
        .datum(this.data)
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 1.5)
        .attr('d', line()
          .x((d) => x(d.date))
          .y((d) => y(d.value)));
    },
  },
  watch: {
    data() { this.drawData(); },
  },
};
</script>
