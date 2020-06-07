const countries = require('./src/constants/countries.js');
let renderRoutes = countries.map(function(c) { return "/" + c.code; });
renderRoutes.push('/about', '/');

module.exports = {
  pluginOptions: {
    prerenderSpa: {
      registry: undefined,
      renderRoutes: renderRoutes,
      useRenderEvent: true,
      headless: true,
      onlyProduction: true,
    },
  },
};
