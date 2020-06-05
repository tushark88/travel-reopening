<template>
  <svg class="mx-auto" width='770' height='390'></svg>
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
  methods: {
    handleCountryChange(currentCountry) {
      d3.select(this.$el)
        .selectAll('.state')
        .classed('current', (d) => +d.id === +currentCountry.id);
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
      this.handleCountryChange(this.country);
    });
  },
  watch: {
    country(currentCountry) { this.handleCountryChange(currentCountry); },
  },
};
</script>

<style>
.state {
  cursor: pointer;
  fill: #edf9f8;
  stroke: #dcebec;
}

.state:hover {
  fill: #dcebec;
}

.state:hover.current {
  @apply fill-current stroke-current text-tertiary;
}
</style>
