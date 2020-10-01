const db = require('./data.json');

const database = () => {

    const candies = db.candies;
    const offers = db.offers;
    const pinatas = db.pinatas;


    return {
        candies,
        offers,
        pinatas
    }
}

module.exports = database();