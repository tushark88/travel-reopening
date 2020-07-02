/* eslint-disable-next-line @typescript-eslint/no-var-requires */
const countries = require('./country-codes_json.json');

const removeDiacritics = function (text) {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

/* eslint-disable-next-line func-names */
const toSlug = function (name) {
  if (!name) { return ''; }
  return removeDiacritics(name)
    .replace(/(\.|\(|\)|-|&)+/, '')
    .replace(/\W+/g, ' ')
    .split(/ /)
    .map((w) => w.toLowerCase())
    .join('_');
};

const cc = countries.map((c) => {
  const name = c['CLDR display name'];
  return {
    id: c['ISO3166-1-numeric'],
    code: c['ISO3166-1-Alpha-2'],
    name,
    alpha3: c['ISO3166-1-Alpha-3'],
    slug: toSlug(name),
  };
}).filter(({ name }) => !!name);

module.exports = cc;
