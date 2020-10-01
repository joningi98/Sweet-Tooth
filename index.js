const candyService = require('./Services/candyService');
const offerService = require('./Services/offerService');
const pinatasService = require('./Services/pinataService');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

// Using body parser
app.use(bodyParser.json());

// ### GET ALL CANDIES ###
// (10%) /api/candies - Gets all candies within the application
app.get('/api/candies', function(req,res){
    const candies = candyService.getAllCandies();
    return res.status(200).json(candies);
});

// ### GET CANDIES WITH ID ###
// (10%) /api/candies/{id} - Gets a candy with a certain id
app.get('/api/candies/:id', function(req,res){
    const candyId = req.params.id;
    const specificCandy = candyService.getCandieById(candyId);
    return res.status(200).json(specificCandy);
});

// ### POST CANDIES ###
/*
/api/candies - Creates a new candy (NO MODEL VALIDATION) and should return
the newly created model along with a proper status code
*/
app.post('/api/candies', function(req, res){
    console.log(req.body, "req.body!!")

    const newCandy = candyService.CreateNewCandy(req.body);
    console.log(newCandy, "<---------");
    //if (newCandy.length !== 2){
     //   res.status(400).json({success: false, error: 'Sorry, error'});
    //}
    return res.status(201).json(newCandy);
});

// ### GET OFFERS ###
/*
(10%) /api/offers - Gets all offers within the application and the output should include the
nested candies within the offer object as seen in the Model Structure section
 */
app.get('/api/offers', function(req,res){
    const offers = offerService.getAllOffers();
    return res.status(200).json(offers);
});

// ### GET PINATAS ###
/*
(10%) /api/pinatas - Gets all pinatas within the application - should contain all properties
excluding surprise
 */
app.get('/api/pinatas', function(req,res){
    const pinatas = pinatasService.getAllPinatas();
    return res.status(200).json(pinatas);
});

// ### GET PINATA BY ID ###
/*
(10%) /api/pinatas/{id} - Gets a pinata with a certain id - should contain all properties
excluding surprise
 */
app.get('/api/pinatas/:id', async function(req, res){
    const pinatasId = req.params.id;
    const specificPinata = pinatasService.getPinatasById(pinatasId);
    return res.status(200).json(specificPinata);
});

// ### POST PINATA ###
/*
(20%) /api/pinatas - Create a new pinata (NO MODEL VALIDATION) and should return the
newly created model along with a proper status code. Here the model should also include a
surprise property which can either be a written text or an URL to a valid image (.jpg, .png,
etc.)
 */
app.post('/api/pinatas', async function(req, res){
    const newPinata = pinatasService.createNewPinata(req.body);
    return res.status(201).json(newPinata);
});


/*
(30%) /api/pinatas/{id}/hit - Hits a certain pinata until its hit limit has been reached.
If the hit was a success it should return a status code of 204 (No Content), unless it
was the final blow than it should return a status code of 200 (OK) along with the
surprise property from the pinata as a string (the surprise will only be returned a
single time)
    • A side-effect of the final blow should be one of the following:
    • If the surprise property value is a written text it should be appended to a file
      called surprises.txt which should reside in the root folder, where each surprises
      are separated by a newline
    • Otherwise if it is an URL to an image it should be downloaded using the request
      package and piped into a new file using a write stream, where the file should
      have the name of the pinata (+ the correct extension) and reside in a folder
      called images/ which should be in the root folder.
      • If the hit limit has been reached the endpoint should return a status code 423 (Locked)
 */
app.put('/api/pinatas:id/hit', function(req, res){
    const specificPinata = req.params.id;
    const hit = pinatasService.hitPinata(specificPinata);
    if (hit === true) {
        return res.status(200).json(specificPinata.currentHits)
    }
    else {
        return res.status(204).json(pinatasService.addCurrentHits(specificPinata))
    }

});

app.listen(3000, () => {
    console.log(`Service is listening on port 3000`);
});