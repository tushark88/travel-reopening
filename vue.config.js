const path = require('path');
const PrerenderSPAPlugin = require('prerender-spa-plugin');

const countries = require('./src/constants/countries.js');
const routes = countries.map((c) => `/${c.code}.html`);
routes.push('/about.html', '/');

module.exports = {
  configureWebpack: {
    plugins: [
      new PrerenderSPAPlugin({
          staticDir: path.join(__dirname, 'dist'),
          routes,
          postProcess (renderedRoute) {
            // Ignore any redirects.
            renderedRoute.route = renderedRoute.originalRoute
            // Remove /index.html from the output path if the dir name ends with a .html file extension.
            // For example: /dist/dir/special.html/index.html -> /dist/dir/special.html
            if (renderedRoute.route.endsWith('.html')) {
              renderedRoute.outputPath = path.join(__dirname, 'dist', renderedRoute.route)
            }

            return renderedRoute
          },
          minify: {
            collapseBooleanAttributes: true,
            collapseWhitespace: true,
            decodeEntities: true,
            keepClosingSlash: true,
            sortAttributes: true
          },
      })
    ]
  },
};
