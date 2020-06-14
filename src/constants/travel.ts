/* eslint-disable @typescript-eslint/ban-ts-ignore */
// @ts-ignore

import Travel from '@/constants/travel.yaml';

export default Travel;

const { countries } = Travel;

export const reopenings = Object.keys(countries)
  .reduce((acc: {date: string; content: string; country: string}[], country) => {
    const { reopening } = countries[country];
    if (reopening) {
      const convertedOpenings = Object.keys(reopening)
        .map((date) => ({ date, content: reopening[date], country }));
      return acc.concat(convertedOpenings);
    }
    return acc;
  }, [])
  .sort((a, b) => Date.parse(a.date) - Date.parse(b.date));

export const futureReopenings = reopenings.filter(({ date }) => Date.parse(date) > Date.now());
