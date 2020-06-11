<template>
  <svg class="mx-auto" width='770' height='390' viewBox="410 120 700 400"></svg>
</template>

<script>
import { select, json, mouse } from 'd3';
import { geoEquirectangular, geoPath } from 'd3-geo';
import { geoVanDerGrinten3 } from 'd3-geo-projection';
import { feature } from 'topojson';
import { mapGetters, mapState } from 'vuex';

const EXCLUDE_COUNTRIES = ['Antarctica']; // Antarctica

const renderTooltip = (accessor) => (selection) => {
  let tooltipDiv;
  const bodyNode = select('body').node();
  selection.on('mouseover', () => {
    // Clean up lost tooltips
    select('body').selectAll('div.tooltip').remove();
    // Append tooltip
    tooltipDiv = select('body').append('div').attr('class', 'tooltip');
    const absoluteMousePos = mouse(bodyNode);
    tooltipDiv.style('left', `${absoluteMousePos[0] + 10}px`)
      .style('top', `${absoluteMousePos[1] - 15}px`)
      .style('position', 'absolute')
      .style('z-index', 1001);
  })
    .on('mousemove', (d, i) => {
      const absoluteMousePos = mouse(bodyNode);
      tooltipDiv.style('left', `${absoluteMousePos[0] + 20}px`)
        .style('top', `${absoluteMousePos[1] - 15}px`);
      const tooltipText = accessor(d, i) || '';
      tooltipDiv.html(tooltipText);
    })
    .on('mouseout', () => {
      tooltipDiv.remove();
    });
};

const capitalise = function (string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const tooltipBody = function (d) {
  const country = this.getCountryById(d.id);
  const state = this.getCountryGlobalState(country.code);
  return `
    <div class="w-48 text-gray-900 bg-white rounded-md shadow">
      <div class="px-4 py-3">
        <p class="mt-0 mb-1 text-sm font-semibold uppercase">${d.properties.name}</p>
        <div class="flex flex-col flex-no-wrap">
          <div class="flex">
            <span class="flex-1 text-sm">Domestic:</span>
            <span class="flex-1 text-sm">${capitalise(state.domestic || 'Unknown')}</span>
          </div>
          <div class="flex">
            <span class="flex-1 text-sm">Travel to:</span>
            <span class="flex-1 text-sm">${capitalise(state.inbound || 'Unknown')}</span>
          </div>
          <div class="flex">
            <span class="flex-1 text-sm">Travel from:</span>
            <span class="flex-1 text-sm">${capitalise(state.outbound || 'Unknown')}</span>
          </div>
        </div>
      </div>
    </div>
  `;
};

export default {
  computed: {
    ...mapGetters(['getCountryById', 'getCountryState', 'getCountryGlobalState']),
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
            return this.getCountryState(country.code, context, this.country) === 'yes';
          }
          return false;
        })
        .classed('closed', (d) => {
          if (d.id) {
            const country = this.getCountryById(d.id);
            return this.getCountryState(country.code, context, this.country) === 'no';
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
    const projection = geoVanDerGrinten3();
    const path = geoPath().projection(projection);

    json('/data/countries-110m.json').then((data) => {
      const countries = feature(data, data.objects.countries)
        .features
        .filter(({ properties: { name } }) => !EXCLUDE_COUNTRIES.includes(name));
      const g = svg.append('g');
      g
        .selectAll('.state')
        .data(countries)
        .enter()
        .append('path')
        .attr('class', 'state')
        .attr('d', path)
        .on('click', (d) => {
          const country = this.getCountryById(d.id);
          if (this.$route.params.country === country.code) return;
          this.$router.push({ name: 'Country', params: { country: country.code } });
        })
        .call(renderTooltip(tooltipBody.bind(this)))
        .attr('transform', 'scale(1.55)');

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
    fill: theme("colors.gray.400");
    stroke: theme("colors.gray.200");
    stroke-width: 0.5;
    cursor: pointer;
    transition: fill 100ms ease;
    &.undefined { fill: theme("colors.gray.400"); }
    &.closed    { fill: theme("colors.secondary"); }
    &.open      { fill: #00916e; }
    &.partial   { fill: #ffc857; }
    &:hover { opacity: 0.85; }
    &.current   {
      fill: theme("colors.primary");
      &:hover {
        cursor: unset;
        opacity: 1;
      }
    }
  };
</style>
