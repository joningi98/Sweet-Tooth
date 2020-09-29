const offerDb = require('../Data/data.json');

const offerService = () => {

    const getAllOffers = () => {
        return offerDb.offers
    };


    return {
        getAllOffers,
    }
};

module.exports = offerService();