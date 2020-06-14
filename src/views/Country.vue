<!-- eslint-disable max-len -->
<template>
  <div>
    <TitleMapSelect/>
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
      <div class="bg-white overflow-hidden shadow rounded-md max-w-4xl mx-auto px-4 py-5 pt-6 pb-4 md:py-6">
        <h2>{{title}}</h2>
        <p>Follow news and updates of current travel restrictions and reopening timelines for {{country.name}}.</p>
        <p v-if='updatedOn'>Last updated on {{updatedOn}}</p>
        <CountryBody :content="this.domesticContent">
          <h2>Domestic Travel</h2>
        </CountryBody>
        <CountryBody :content="this.internationalContent">
          <h2>International Travel</h2>
        </CountryBody>
        <CountryBody :content="this.visaQuarantineContent">
          <h2>Visa &amp; Quarantine Measures</h2>
        </CountryBody>
      </div>
    </div>
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
      <div class="bg-white overflow-hidden shadow rounded-md max-w-4xl mx-auto px-4 py-5 pt-6 pb-4 md:py-6">
        <Subscription/>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import CountryBody from '@/components/CountryBody.vue';
import Subscription from '@/components/Subscription.vue';
import TitleMapSelect from '@/components/TitleMapSelect.vue';
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  name: 'Country',
  components: {
    CountryBody,
    Subscription,
    TitleMapSelect,
  },
  data() {
    return {
      domesticContent: null,
      internationalContent: null,
      visaQuarantineContent: null,
    };
  },
  computed: {
    ...mapState(['country']),
    ...mapGetters(['getCountryByCode', 'getCountryGlobalState']),
    title() { return `${this.country.name} COVID-19 Travel Update`; },
    updatedOn() {
      return this.getCountryGlobalState(this.$route.params.country)?.updatedOn;
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
        axios(`/data/${this.country.code}_domestic.md`),
        axios(`/data/${this.country.code}_international.md`),
        axios(`/data/${this.country.code}_visa_quarantine.md`),
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
