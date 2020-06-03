<template>
  <svg width='500' height='300'></svg>
</template>

<script>
import * as d3 from 'd3';
import * as topojson from 'topojson';
import { mapGetters, mapState } from 'vuex';

export default {
  computed: {
    ...mapGetters(['getCountryById']),
    ...mapState(['country']),
  },
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
        .on('click', (d) => {
          const country = this.getCountryById(d.id);
          const newPath = `/${country.code}`;
          if (this.$route.path !== newPath) this.$router.push(newPath);
        });
      g.attr('transform', 'scale(0.80)');
    });
  },
  watch: {
    country(currentCountry) {
      d3.select(this.$el)
        .selectAll('.state')
        .classed('current', (d) => +d.id === +currentCountry.id);
    },
  },
};
</script>

<style lang="scss">
  .state {
    cursor: pointer;
    fill: #ccc;
    stroke: #fff;
    &:hover {
      fill: steelblue;
    }
    &.current {
      fill: red;
      stroke: red;
    }
  }
</style>
