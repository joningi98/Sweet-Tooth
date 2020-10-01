const candyDb = require('../Data/database');

const candyService = () => {

    const getAllCandies = () => {
        return candyDb.candies
    };

    const getCandieById = (id) => {
        return candyDb.candies.filter(item => item.id === Number(id))
    };

    const findNewId = () => {
        const candies = candyDb.candies;
        return Math.max.apply(Math, candies.map(function(candy) { return candy.id; })) + 1;
    };

    const CreateNewCandy = (temp_json) => {
        const newCandy = {
            "id": findNewId(),
            "name": temp_json.name,
            "description": temp_json.description};
        return candyDb.candies.push(newCandy);
    };

    return {
        getCandieById,
        getAllCandies,
        CreateNewCandy
    }
};

module.exports = candyService();