const pinatasDb = require('../Data/data.json');

const offerService = () => {

    const pinataMinimumInfo = (pinata) => {
        const currentHits = pinata.currentHits ? undefined : 0;
        return {"id": pinata.id, "name": pinata.name, "maximumHits": pinata.maximumHits, "currentHits": currentHits};
    }

    const getAllPinatas = () => {
        const pinatas = pinatasDb.pinatas;
        const tempPinataArray = [];
        pinatas.forEach(function (pinata){
            tempPinataArray.push(pinataMinimumInfo(pinata));
        });
        return tempPinataArray;
    };


    const getPinatasById = (id) => {
        const pinata = pinatasDb.pinatas.find(item => item.id === Number(id));
        return pinataMinimumInfo(pinata);
    };

    const findNewId = () => {
        const pinatas = pinatasDb.pinatas;
        return Math.max.apply(Math, pinatas.map(function(pinata) { return pinata.id; })) + 1;
    };

    const createNewPinata = (pinata) => {
        const tempPinata = {
            "id": findNewId(),
            "name": pinata.name,
            "surprise": pinata.surprise,
            "maximumHits": pinata.maximumHits,
            "currentHits": 0
        };

        pinatasDb.pinatas.push(tempPinata);
        return pinataMinimumInfo(tempPinata);
    };

    const addCurrentHits = (id) => {
        const pinataIx = pinatasDb.pinatas.findIndex((obj => obj.id === Number(id)));
        const pinata = pinatasDb.pinatas[pinataIx];
        if (pinata.currentHits === null) {
            pinata.currentHits = Number(0);
        }
        pinata.currentHits += Number(pinata.currentHits + 1);
        console.log(pinatasDb.pinatas);
    };


    const hitPinata = (id) => {
        const pinata = getPinatasById(id);
        if (pinata.currentHits == pinata.maximumHits) {
            return false
        } else {
            addCurrentHits(id);
            if (pinata.currentHits == pinata.maximumHits) {
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