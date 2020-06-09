<template>
  <svg class="mx-auto" width='770' height='390'></svg>
</template>

<script>
import { select, json, mouse } from 'd3';
import { geoEquirectangular, geoPath } from 'd3-geo';
import { feature } from 'topojson';
import { mapGetters, mapState } from 'vuex';

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

const tooltipBody = function (d) {
  const country = this.getCountryById(d.id);
  const state = this.getCountryGlobalState(country.code);
  return `
    <div class="bg-primary bg-opacity-50 text-white rounded-md p-2">
      <b>${d.properties.name}</b>
      <ul>
        <li>Domestic: ${state.domestic || 'Unknown'}</li>
        <li>Inbound: ${state.inbound || 'Unknown'}</li>
        <li>Outbound: ${state.outbound || 'Unknown'}</li>
      </ul>
    </div>`;
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
        })
        .call(renderTooltip(tooltipBody.bind(this)));
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
