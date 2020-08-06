const path = require('path');
const csv = require('csvtojson/v2');
const puppeteer = require('puppeteer');

const csvFilePath = path.join(__dirname + '/lps.csv');

function readData() {
    return csv({
        output: 'json',
        delimiter: ';',
    }).fromFile(csvFilePath);
}

// init database
const db = readData().then(data => {
    return data.reduce((acc, item) => {
        const landing = acc.find(lp => lp.name === item.name);
        if (landing) {
            landing.version = item.version;
            return acc;
        }

        acc.push(item);

        return acc;
    }, []);
});

const getAllLps = () => db;
const getLpById = id => db.find(landing => landing.lid === id);
const getLpsByIds = ids => db.filter(landing => ids && ids.includes(landing.lid));
const getLpsByNames = names => db.filter(landing => names && names.includes(landing.name));

const getLpsByUrls = async urls => {
    const browser = await puppeteer.launch();

    const lids = urls.map(async url => {
        const page = await browser.newPage();
        await page.goto(`https://www.${url}`);
        const id = await page.$eval('input[name="UserForm[lid]"]', el => el.value);

        return id;
    });
    const ids = await Promise.all(lids);

    await browser.close();

    return db.filter(landing => ids.includes(landing.lid));
};

module.exports = {
    getAllLps,
    getLpById,
    getLpsByIds,
    getLpsByNames,
    getLpsByUrls,
};
