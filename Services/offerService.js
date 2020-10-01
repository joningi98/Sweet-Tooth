const offerDb = require('../Data/database').offers;
const candyService = require('./candyService');

const offerService = () => {

    const getAllOffers = () => {
        const offers = offerDb.offers;
        offers.forEach(function (offer){
            const tempArray = [];
            offer.candies.forEach(function (candy){
                tempArray.push(candyService.getCandieById(candy))
            });
            offer.candies = tempArray;
        });
        return offerDb.offers
    };


    return {
        getAllOffers,
    }
};

module.exports = offerService();