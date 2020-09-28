const candyDb = require('../Data/data.json').candies;

const candyService = () => {

    const getAllCandies = () => new Promise((resolve, reject) => {
        candyDb.find({}, (err, candies) => {
            if (err) { reject(err) }
            else { resolve(candies) }
        })
    });

    return {
        getAllCandies
    }
}

module.exports = candyService();