export function csvJSON(csv) {

  const lines = csv.split("\n");

  const result = [];

  // NOTE: If your columns contain commas in their values, you'll need
  // to deal with those before doing the next step
  // (you might convert them to &&& or something, then covert them back later)
  // jsfiddle showing the issue https://jsfiddle.net/
  const headers = lines[0].split(",");

  for (let i = 1; i < lines.length; i++) {

    const obj = {};
    const currentline = lines[i].split(",");

    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
    }

    result.push(obj);
  }

  //return result; //JavaScript object
  return result; //JSON
}

export function filterDataset(dataset, filter) {
  const keys = Object.keys(filter);

  if (!keys.length) {
    return dataset;
  }

  return dataset.filter(datum => {
    return keys.find(key => datum[key] === filter[key]);
  });
}
