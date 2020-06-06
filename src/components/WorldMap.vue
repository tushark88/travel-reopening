<template>
  <svg class="mx-auto" width='770' height='390'></svg>
</template>

<script>
import * as d3 from 'd3';
import * as topojson from 'topojson';
import { mapGetters, mapState } from 'vuex';

export default {
  computed: {
    ...mapGetters(['getCountryById', 'getCountryState']),
    ...mapState(['country', 'travelContext']),
  },
  methods: {
    handleCountryChange(currentCountry) {
      d3.select(this.$el)
        .selectAll('.state')
        .classed('current', (d) => !!currentCountry && +d.id === +currentCountry.id);
    },
    handleContextChange(context) {
      d3.select(this.$el)
        .selectAll('.state')
        .classed('open', (d) => {
          if (d.id) {
            const country = this.getCountryById(d.id);
            return this.getCountryState(country.code, context) === 'open';
          }
          return false;
        })
        .classed('closed', (d) => {
          if (d.id) {
            const country = this.getCountryById(d.id);
            return this.getCountryState(country.code, context) === 'closed';
          }
          return false;
        })
        .classed('partial', (d) => {
          if (d.id) {
            const country = this.getCountryById(d.id);
            return this.getCountryState(country.code, context) === 'partial';
          }
          return false;
        })
        .classed('undefined', (d) => {
          if (d.id) {
            const country = this.getCountryById(d.id);
            return this.getCountryState(country.code, context) === undefined;
          }
          return true;
        });
    },
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
      if (this.country) this.handleCountryChange(this.country);
      if (this.travelContext) this.handleContextChange(this.travelContext);
    });
  },
  watch: {
    country(currentCountry) { this.handleCountryChange(currentCountry); },
    travelContext(context) { this.handleContextChange(context); },
  },
};
</script>

<style lang="scss">
  .state {
    transition: fill .1s ease;
    cursor: pointer;
    fill: #edf9f8;
    stroke: #dcebec;
    &.undefined { fill: #edf9f8; }
    &.closed { fill: pink; }
    &.open { fill: green; }
    &.partial { fill: orange; }
    &.current { fill: #307582; }
    &:hover {
      fill: #dcebec;
      &.current { @apply fill-current text-tertiary; }
    }
  }
</style>
