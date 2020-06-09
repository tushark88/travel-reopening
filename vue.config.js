const countries = require('./src/constants/countries.js');

const renderRoutes = countries.map((c) => `/${c.code}`);
renderRoutes.push('/about', '/');

module.exports = {
  pluginOptions: {
    prerenderSpa: {
      registry: undefined,
      renderRoutes,
      useRenderEvent: true,
      headless: true,
      onlyProduction: true,
    },
  },
};
