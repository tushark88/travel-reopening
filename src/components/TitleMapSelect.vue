<template>
  <div>
    <div class="main-container">
      <div class="main-container__inner">
        <div class="mb-4 sm:mb-6 lg:mb-8">
          <h1>The Ultimate Guide to COVID–19 Travel Restrictions</h1>
          <p class="w-full md:w-9/12">
            A free and open-source project by
            <a class="inline-flex no-underline" href="https://www.tourhero.com/">TourHero</a>
          </p>
          <p class="w-full md:w-9/12">
            <span class="font-semibold">How it works:</span>
            Select the country you want to visit and view the travel restrictions.
            Or, switch to the country you’re traveling from to see which countries
            you’re allowed to enter.
            Travel safe!
          </p>
        </div>
        <div class="flex flex-col sm:flex-row mb-4 sm:mb-6 lg:mb-8">
          <div class="mr-0 sm:mr-2">
            <TravelDirectionToggle/>
          </div>
          <CountrySelect class="mt-4 sm:mt-0"/>
        </div>
      </div>
    </div>
    <div class="bg-warm-gray-50 py-1 mb-4 sm:mb-6 lg:mb-8">
      <div class="main-container">
        <div class="main-container__inner">
          <WorldMap/>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import CountrySelect from '@/components/CountrySelect.vue';
import TravelDirectionToggle from '@/components/TravelDirectionToggle.vue';
import WorldMap from '@/components/WorldMap.vue';

export default {
  name: 'TitleMapSelect',
  components: { CountrySelect, TravelDirectionToggle, WorldMap },
};
</script>
