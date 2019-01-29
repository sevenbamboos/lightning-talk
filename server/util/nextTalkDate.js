const cacheByYear = {};

const nextTalkDate = (date) => {
  const d = date || new Date(); 
  const year = d.getFullYear();
  return firstThursdays(year).find(x => x > d);
};

const prevTalkDate = (date) => {
  const d = date || new Date(); 
  const year = d.getFullYear();
  const thursdays = firstThursdays(year);
  const thursdaysSinceLastYear = firstThursdays(year-1).concat(thursdays);
  const index = thursdaysSinceLastYear.findIndex(x => x > d);
  return thursdaysSinceLastYear[index-1];
};

const firstThursdays = year => {

  if (cacheByYear[year]) return cacheByYear[year];

  const firsts = [1, 3, 5, 7, 9, 11].map(x => new Date(year, x, 1));
  const diffs = firsts.map(first => {const diff = 4 - first.getDay(); return diff > 0 ? diff : 7 + diff;});
  const zip= rows=>rows[0].map((_,c)=>rows.map(row=>row[c]));
  const firstsWithDiffs = zip([firsts, diffs]);
  const thursdays = firstsWithDiffs.map(z => addDaysTo(z[0], z[1]));

  cacheByYear[year] = thursdays;
  return thursdays;
};

// no need to worry about date overflow
const addDaysTo = (aDate, days) => {
  let d = new Date(aDate.getTime());
  d.setDate(aDate.getDate() + days);
  return d;
};

console.log(prevTalkDate(), nextTalkDate());

module.exports = {
  nextTalkDate, prevTalkDate,
};