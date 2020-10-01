const pinatasDb = require('../Data/database').pinatas;

const offerService = () => {

    const pinataMinimumInfo = (pinata) => {
        pinata.currentHits = pinata.currentHits | 0;
        return pinata
    };

    const getAllPinatas = () => {
        const pinatas = pinatasDb;
        const tempPinataArray = [];
        pinatas.forEach(function (pinata){
            tempPinataArray.push(pinataMinimumInfo(pinata));
        });
        return tempPinataArray;
    };

    const getPinatasById = (id) => {
        const pinata = pinatasDb.find(item => item.id === Number(id));
        return pinataMinimumInfo(pinata);
    };

    const findNewId = () => {
        return Math.max.apply(Math, pinatasDb.map(function(pinata) { return pinata.id; })) + 1;
    };

    const createNewPinata = (pinata) => {
        const tempPinata = {
            "id": findNewId(),
            "name": pinata.name,
            "surprise": pinata.surprise,
            "maximumHits": pinata.maximumHits,
            "currentHits": 0
        };

        pinatasDb.push(tempPinata);
        return pinataMinimumInfo(tempPinata);
    };

    const addCurrentHits = (id) => {
        pinatasDb.forEach(function (pinata){
            if (pinata.id === Number(id)){
                if (pinata.currentHits === undefined){
                    pinata.currentHits = 1;
                } else {
                    pinata.currentHits += 1;
                }
            }
        });
    };

    const hitPinata = (id) => {
        const pinata = pinatasDb.find(item => item.id === Number(id));
        if (pinata.currentHits === pinata.maximumHits) {
            return false
        } else {
            addCurrentHits(id);
            if (pinata.currentHits === pinata.maximumHits) {
                return pinata.surprise;
            }
            else {
                return true;
            }
        }
    };

    return {
        getAllPinatas,
        getPinatasById,
        createNewPinata,
        hitPinata,
        addCurrentHits
    }
};

module.exports = offerService();