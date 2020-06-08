<template>
  <svg class="mx-auto" width='770' height='390'></svg>
</template>

<script>
import { select, json } from 'd3';
import { geoEquirectangular, geoPath } from 'd3-geo';
import { feature } from 'topojson';
import { mapGetters, mapState } from 'vuex';

export default {
  computed: {
    ...mapGetters(['getCountryById', 'getCountryState']),
    ...mapState(['country', 'travelContext']),
  },
  methods: {
    handleCountryChange(country) {
      this.drawCurrentCountry(country);
      this.drawOpenRegions(this.travelContext);
    },
    handleContextChange(context) {
      this.drawOpenRegions(context);
    },
    drawCurrentCountry(currentCountry) {
      select(this.$el)
        .selectAll('.state')
        .classed('current', (d) => !!currentCountry && +d.id === +currentCountry.id);
    },
    drawOpenRegions(context) {
      select(this.$el)
        .selectAll('.state')
        .classed('open', (d) => {
          if (d.id) {
            const country = this.getCountryById(d.id);
            return this.getCountryState(country.code, context, this.country) === 'open';
          }
          return false;
        })
        .classed('closed', (d) => {
          if (d.id) {
            const country = this.getCountryById(d.id);
            return this.getCountryState(country.code, context, this.country) === 'closed';
          }
          return false;
        })
        .classed('partial', (d) => {
          if (d.id) {
            const country = this.getCountryById(d.id);
            return this.getCountryState(country.code, context, this.country) === 'partial';
          }
          return false;
        })
        .classed('undefined', (d) => {
          if (d.id) {
            const country = this.getCountryById(d.id);
            return this.getCountryState(country.code, context, this.country) === undefined;
          }
          return true;
        });
    },
  },
  mounted() {
    const svg = select(this.$el);
    // const width = +svg.attr('width');
    // const height = +svg.attr('height');
    const projection = geoEquirectangular();
    const path = geoPath().projection(projection);

    json('/data/countries-110m.json').then((data) => {
      const g = svg.append('g');
      g
        .selectAll('.state')
        .data(feature(data, data.objects.countries).features)
        .enter()
        .append('path')
        .attr('class', 'state')
        .attr('d', path)
        .on('click', (d) => {
          const country = this.getCountryById(d.id);
          if (this.$route.params.country === country.code) return;
          this.$router.push({ name: 'Country', params: { country: country.code } });
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
