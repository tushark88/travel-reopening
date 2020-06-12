<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto py-6">
      <h1>About</h1>

      <h2>About this project</h2>
      <p>
        [Project Name] provides an up–to–date view of travel restrictions around
        the world due to the COVID–19 pandemic. We hope this information will be
        useful to businesses and individuals who require insights into the global
        situation in planning their travel.
      </p>
      <p>
        Our data is pulled from multiple sources including official government
        websites, news outlets, and the International Air Transport Association
        (IATA). Selecting a country will display detailed information on domestic
        travel, international travel, and visa and quarantine regulations current
        to the destination, as well as relevant links to sources.
      </p>

      <h2>How you can contribute</h2>
      <p>
        As the situation changes rapidly around the world, keeping information
        up–to–date can be challenging. If you spot any incorrect or outdated
        information, we encourage you to contribute to the project. The source
        code and the data is open-sourced on Github:
        <a href="https://github.com/tourhero/travel-reopening">
          https://github.com/tourhero/travel-reopening
        </a>.
      </p>

      <h2>Disclaimer</h2>
      <p>Advisories may change without warning. Please check official government
        websites for up–to–date information on travel restrictions prior to your
        journeys. This project displays information that is related only to COVID–19
        travel restrictions and not to existing restrictions.
      </p>

      <h2>Legend</h2>
      <dl>
        <dt>Green</dt>
        <dd>No travel restrictions related to COVID–19 apply</dd>
        <dt>Yellow</dt>
        <dd>
          Some travel restrictions apply depending on traveler’s point of origin,
          nationality, or other reasons
        </dd>
        <dt>Red</dt>
        <dd>Non-essential travel is prohibited. Repatriation travel may be possible</dd>
        <dt>Gray</dt>
        <dd>No information</dd>
        <dt>Blue</dt>
        <dd>Selected country</dd>
      </dl>
    </div>
  </div>
</template>

<style lang="scss">
  $column_width: 100px;
  dl {
    padding: 0.5em;
    dt {
      float: left;
      clear: left;
      width: $column_width;
      text-align: right;
      font-weight: bold;
      &::after {
        content: ":";
      }
    }
    dd {
      margin: 0 0 0 $column_width + 10px;
      padding: 0 0 0.5em 0;
    }
  }
</style>
