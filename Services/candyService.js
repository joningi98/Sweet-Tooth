const candyDb = require('../Data/database').candies;

const candyService = () => {

    const getAllCandies = () => {
        return candyDb
    };

    const getCandieById = (id) => {
        return candyDb.filter(item => item.id === Number(id))
    };

    const findNewId = () => {
        return Math.max.apply(Math, candyDb.map(function(candy) { return candy.id; })) + 1;
    };

    const CreateNewCandy = (temp_json) => {
        const newCandy = {
            "id": findNewId(),
            "name": temp_json.name,
            "description": temp_json.description};
        return candyDb.push(newCandy);
    };

    return {
        getCandieById,
        getAllCandies,
        CreateNewCandy
    }
};

module.exports = candyService();