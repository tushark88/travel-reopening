<template>
  <div>
    <TitleMapSelect/>
    <div class="main-container">
      <div class="main-container__inner">
        <div class="panel">
          <div class="panel__inner">
            <h2 class="country-header">{{title}}</h2>
            <p v-if='updatedOn'>Last updated on {{updatedOn}}</p>
            <TravelState :country="country"></TravelState>
            <div v-if='domesticContent || internationalContent || visaQuarantineContent'>
              <CountryBody :content="this.domesticContent">
                <h3>Domestic Travel</h3>
              </CountryBody>
              <CountryBody :content="this.internationalContent">
                <h3>International Travel</h3>
              </CountryBody>
              <CountryBody :content="this.visaQuarantineContent">
                <h3>Visa &amp; Quarantine Measures</h3>
              </CountryBody>
            </div>
            <div v-else>
              Oops...sorry, we don't have information about {{country.name}} at the moment.
              Help us improve this data by dropping us
              <a href="mailto:travel-map@tourhero.com?subject=Travel+Map+Update">an email</a>.
              Thank you very much for your help!
            </div>
          </div>
        </div>
        <CountrySources :countryCode="country.code"></CountrySources>
        <Disclaimer />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import CountryBody from '@/components/CountryBody.vue';
import CountrySources from '@/components/CountrySources.vue';
import Disclaimer from '@/components/Disclaimer.vue';
import TitleMapSelect from '@/components/TitleMapSelect.vue';
import TravelState from '@/components/TravelState.vue';
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  name: 'Country',
  components: {
    CountryBody,
    CountrySources,
    Disclaimer,
    TitleMapSelect,
    TravelState,
  },
  data() {
    return {
      domesticContent: null,
      internationalContent: null,
      visaQuarantineContent: null,
      baseUrl: process.env.BASE_URL,
    };
  },
  computed: {
    ...mapState(['country']),
    ...mapGetters(['getCountryByCode', 'getCountryGlobalState']),
    title() { return `${this.country.name} COVID-19 Travel Update`; },
    updatedOn() {
      const date = this.getCountryGlobalState(this.$route.params.country)?.updatedOn;
      return date ? moment(date).format('MMMM Do, YYYY') : date;
    },
  },
  methods: {
    ...mapActions(['updateCountryAction']),
    fetchData() {
      this.domesticContent = null;
      this.internationalContent = null;
      this.visaQuarantineContent = null;

      const country = this.getCountryByCode(this.$route.params.country);
      this.updateCountryAction(country);

      const promises = [
        axios(`${this.baseUrl}data/${this.country.code}_domestic.md`),
        axios(`${this.baseUrl}data/${this.country.code}_international.md`),
        axios(`${this.baseUrl}data/${this.country.code}_visa_quarantine.md`),
      ];

      Promise.allSettled(promises).then(axios.spread((...r) => {
        if (r[0].status === 'fulfilled') { this.domesticContent = r[0].value.data; }
        if (r[1].status === 'fulfilled') { this.internationalContent = r[1].value.data; }
        if (r[2].status === 'fulfilled') { this.visaQuarantineContent = r[2].value.data; }
        this.$nextTick(() => document.dispatchEvent(new Event('render-completed')));
      }));
    },
  },
  metaInfo() {
    return {
      title: this.title,
      meta: [{
        name: 'description',
        content: `Find the latest updates on travel restrictions and reopening timelines for ${this.country.name}.`,
      }],
    };
  },
  watch: {
    '$route.path': 'fetchData',
  },
  created() {
    this.fetchData();
  },
  beforeRouteLeave(to, from, next) {
    this.updateCountryAction(null);
    next();
  },
};
</script>
