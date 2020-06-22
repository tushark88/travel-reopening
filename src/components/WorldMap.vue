<template>
  <div>
    <h2 class='mt-4'>{{mapTitle}}</h2>
    <svg :width='svgWidth' :height='svgHeight' viewBox="410 120 700 400"></svg>
  </div>
</template>

<script>
import { select, json, mouse } from 'd3';
import { geoPath } from 'd3-geo';
import { geoVanDerGrinten3 } from 'd3-geo-projection';
import { feature } from 'topojson';
import { mapGetters, mapState } from 'vuex';
import { OpenStatus, TravelDirection } from '@/constants/travel';

const EXCLUDE_COUNTRIES = ['Antarctica']; // Antarctica

const renderTooltip = (accessor) => (selection) => {
  if ('ontouchstart' in document) { return; }
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

function travelStateLabel(state) {
  switch (state) {
    case OpenStatus.Open: return 'Open';
    case OpenStatus.Closed: return 'Closed';
    case OpenStatus.Partial: return 'Partial';
    default: return 'Unknown';
  }
}

function tooltipBody(d) {
  const country = this.getCountryById(d.id);
  const state = this.getCountryGlobalState(country.code);

  return `
    <div class="text-gray-900 bg-white rounded-md shadow">
      <div class="px-4 py-3 w-48">
        <div class="flex flex-col">
          <p class="mt-0 mb-2 text-xs font-semibold">${d.properties.name}</p>
          <div class="inline-grid grid-cols-2 grid-col-gap-4 items-baseline pb-1">
            <span class="text-xs">Domestic</span>
            <span class="badge-${state.domestic || 'unknown'} px-2.5 py-0.5 rounded-md text-xs text-center">
              ${travelStateLabel(state.domestic)}
            </span>
          </div>
          <div class="inline-grid grid-cols-2 grid-col-gap-4 items-baseline pb-1">
            <span class="text-xs">Entry</span>
            <span class="badge-${state.inbound || 'unknown'} px-2.5 py-0.5 rounded-md text-xs text-center">
              ${travelStateLabel(state.inbound)}
            </span>
          </div>
          <div class="inline-grid grid-cols-2 grid-col-gap-4 items-baseline ">
            <span class="text-xs">Exit</span>
            <span class="badge-${state.outbound || 'unknown'} px-2.5 py-0.5 rounded-md text-xs text-center">
              ${travelStateLabel(state.outbound)}
            </span>
          </div>
        </div>
      </div>
    </div>
  `;
}

export default {
  data() {
    return {
      svgMaxWidth: 900,
      svgWidth: undefined,
      svgHeight: undefined,
      baseUrl: process.env.BASE_URL,
    };
  },
  computed: {
    ...mapGetters(['getCountryById', 'getCountryState', 'getCountryGlobalState']),
    ...mapState(['country', 'travelContext']),
    mapTitle() {
      if (this.country) {
        return this.travelContext === TravelDirection.Inbound
          ? `Countries allowed entry when traveling to ${this.country.name}`
          : `Countries allowed entry when traveling from ${this.country.name}`;
      }
      return this.travelContext === TravelDirection.Inbound
        ? 'Countries you can travel to'
        : 'Countries you can travel from';
    },
  },
  methods: {
    handleSizeChange() {
      const padding = 12 * 2; // 2 rem
      this.svgWidth = Math.min(+select('body').style('width').slice(0, -2) - padding, this.svgMaxWidth) - padding;
      this.svgHeight = Math.round(this.svgWidth / 2);
    },
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
            return this.getCountryState(country.code, context, this.country) === OpenStatus.Open;
          }
          return false;
        })
        .classed('closed', (d) => {
          if (d.id) {
            const country = this.getCountryById(d.id);
            return this.getCountryState(country.code, context, this.country) === OpenStatus.Closed;
          }
          return false;
        })
        .classed('partial', (d) => {
          if (d.id) {
            const country = this.getCountryById(d.id);
            return this.getCountryState(country.code, context, this.country) === OpenStatus.Partial;
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
  created() { window.addEventListener('resize', this.handleSizeChange); },
  destroyed() {
    select('body').selectAll('div.tooltip').remove();
    window.removeEventListener('resize', this.handleSizeChange);
  },
  mounted() {
    const svg = select(this.$el).select('svg');
    const projection = geoVanDerGrinten3();
    const path = geoPath().projection(projection);

    json(`${this.baseUrl}data/countries-110m.json`).then((data) => {
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
          if (this.$route.params.country === country.slug) return;
          this.$router.push({ name: 'Country', params: { country: country.slug } });
        })
        .call(renderTooltip(tooltipBody.bind(this)))
        .attr('transform', 'scale(1.55)');

      if (this.country) this.handleCountryChange(this.country);
      if (this.travelContext) this.handleContextChange(this.travelContext);
      this.handleSizeChange();
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
    &.open      { fill: theme("colors.state-open") }
    &.partial   { fill: theme("colors.state-partial") }
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
