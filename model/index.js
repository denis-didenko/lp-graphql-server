const path = require('path');
const csv = require('csvtojson/v2');

const csvFilePath = path.join(__dirname + '/lps.csv');

function getData() {
  return csv({
    output: 'json',
    delimiter: ';',
  }).fromFile(csvFilePath);
}

module.exports.getData = getData;
