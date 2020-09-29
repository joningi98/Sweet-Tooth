const pinatasDb = require('../Data/data.json');

const offerService = () => {

    const getAllPinatas = () => {
        return pinatasDb.pinatas
    };

    const getPinatasById = (id) => {
        return pinatasDb.pinatas.filter(item => item.id === Number(id))
    };

    return {
        getAllPinatas,
        getPinatasById
    }
};

module.exports = offerService();