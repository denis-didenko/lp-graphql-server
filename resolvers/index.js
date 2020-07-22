const { getData } = require('../model');

// init database
const db = getData().then((data) => {
  return data.reduce((acc, item) => {
    const landing = acc.find((lp) => lp.name === item.name);
    if (landing) {
      landing.version = item.version;
      return acc;
    }

    acc.push(item);

    return acc;
  }, []);
});

const resolvers = {
  Query: {
    allLps() {
      return db;
    },
    lpsByIds(parent, args) {
      return db.filter((landing) => args.ids && args.ids.includes(landing.lid));
    },
    lp(parent, args) {
      return db.find((landing) => landing.lid === args.id);
    },
  },
};

module.exports = {
  resolvers,
};
