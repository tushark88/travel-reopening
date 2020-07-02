/* eslint-disable-next-line @typescript-eslint/no-var-requires */
const countriesJson = require('./country-codes_json.json');

const removeDiacritics = (text) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
const toSlug = (name) => {
  if (!name) { return ''; }
  return removeDiacritics(name)
    .replace(/(\.|\(|\)|-|&)+/, '')
    .replace(/\W+/g, ' ')
    .split(/ /)
    .map((w) => w.toLowerCase())
    .join('_');
};

const countries = countriesJson.map((c) => {
  const name = c['CLDR display name'];
  const searchKey = [
    name,
  ].join(',');

  return {
    id: c['ISO3166-1-numeric'],
    code: c['ISO3166-1-Alpha-2'],
    name,
    alpha3: c['ISO3166-1-Alpha-3'],
    slug: toSlug(name),
    searchKey: removeDiacritics(searchKey),
  };
}).filter(({ name }) => !!name);

module.exports = {
  countries,
  removeDiacritics,
};
