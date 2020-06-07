module.exports = {
  entriesFromRoutes(paths) {
    return paths.map((p) => ({
      path: p,
      lastmod: new Date().toISOString().slice(0,10),
      priority: '0.8',
      changefreq: 'weekly'
    }))
  },
};
