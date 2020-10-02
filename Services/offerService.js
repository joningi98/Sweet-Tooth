const offerDb = require('../Data/database').offers;
const candyService = require('./candyService');

const offerService = () => {

    const getAllOffers = () => {
        offerDb.forEach(function (offer){
            const tempArray = [];
            offer.candies.forEach(function (candy){
                tempArray.push(candyService.getCandieById(candy))
            });
            offer.candies = tempArray;
        });
        return offerDb
    };


    return {
        getAllOffers,
    }
};

module.exports = offerService();