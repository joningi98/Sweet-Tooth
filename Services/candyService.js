const candyDb = require('../Data/data.json');

const candyService = () => {

    const getAllCandies = () => {
        return candyDb.candies
    };

    const getCandieById = (id) => {
        return candyDb.candies.filter(item => item.id === Number(id))
    };

    const CreateNewCandy = (newCandy) => {
        return candyDb.candies.push(newCandy)
    };

    return {
        getCandieById,
        getAllCandies,
        CreateNewCandy
    }
};

module.exports = candyService();