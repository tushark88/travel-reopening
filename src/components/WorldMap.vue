<template>
  <svg width='500' height='300'></svg>
</template>

<script>
import * as d3 from 'd3';
import * as topojson from 'topojson';

export default {
  mounted() {
    const svg = d3.select(this.$el);
    // const width = +svg.attr('width');
    // const height = +svg.attr('height');
    const projection = d3.geoEquirectangular();
    const path = d3.geoPath().projection(projection);
    d3.json('/data/countries-110m.json').then((data) => {
      const g = svg.append('g');
      g
        .selectAll('.state')
        .data(topojson.feature(data, data.objects.countries).features)
        .enter()
        .append('path')
        .attr('class', 'state')
        .attr('d', path)
        .on('mouseover', (d) => {
          this.$emit('stateSelected', d.properties.STATE_ABBR);
        })
        .on('mouseout', (d) => {
          this.$emit('stateDeselected', d.properties.STATE_ABBR);
        });
      g.attr('transform', 'scale(0.57)');
    });
  },
};
</script>

<style>
  .state {
    fill: #ccc;
    stroke: #fff;
  }
  .state:hover {
    fill: steelblue;
  }
</style>
