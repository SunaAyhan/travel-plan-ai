// get avalibility data from api and send it to the client using express
/* https://api.turkishairlines.com/test/getAvailability is api link. 

example header is:
apikey:...
apisecret:...
*/
const express = require('express');
const axios = require('axios');
const config = require('config');
const apikey = config.get('apikey');
const apisecret = config.get('apisecret');
const API_KEY_GPT = config.get('API_KEY_GPT');
const amadeusAPIKey = config.get('amadeusAPIKey');
const amadeusAPISecret = config.get('amadeusAPISecret');
const url = "https://api.turkishairlines.com/test/getAvailability"
const { check, validationResult } = require('express-validator');
const qs = require('qs');
const app = express();
const cors = require('cors');

app.use(express.json({ extended: false }));
app.use(cors({
    origin: 'http://localhost:3000'
  }));

app.get('/', (req, res) => res.send('API Running'));

app.post('/api', [ check('PassengerQuantity', 'PassengerQuantity is required').not().isEmpty(),
check('TimeInterval', 'TimeInterval is required').not().isEmpty(),
check('OriginLocation', 'OriginLocation is required').not().isEmpty(),
check('DestinationLocation', 'DestinationLocation is required').not().isEmpty(),
check('budget', 'budget is required').not().isEmpty(),
check('duration', 'duration is required').not().isEmpty(),
check('interests', 'interests is required').not().isEmpty(),
check('accommodation', 'accommodation is required').not().isEmpty(),
check('travelStyle', 'travelStyle is required').not().isEmpty(),
check('transportation', 'transportation is required').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({ errors: errors.array() });
    }
    const { PassengerQuantity, TimeInterval, OriginLocation, DestinationLocation, budget, duration, interests, accommodation, travelStyle, transportation } = req.body;
    //ask gpt3 to generate body. Use openai api
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/completions',
            {
                model: "text-davinci-003",
                prompt: "Turkish Airlines has an API to get avalible flights for going and returning dates. Example body for the request is: \n ''' {\"requestHeader\":{\"clientUsername\": \"OPENAPI\",\"clientTransactionId\": \"CLIENT_TEST_1\",\"channel\": \"WEB\"},\"ReducedDataIndicator\": true,\"RoutingType\": \"R\",\"TargetSource\": \"BrandedFares\",  \"PassengerTypeQuantity\": [{\"Code\": \"adult\",\"Quantity\": 1}],\"OriginDestinationInformation\": [{\"DepartureDateTime\": {\"WindowAfter\": \"P0D\",\"WindowBefore\": \"P0D\",\"Date\": \"14MAY\"},\"OriginLocation\": {\"LocationCode\": \"IST\",\"MultiAirportCityInd\": false},\"DestinationLocation\": {\"LocationCode\": \"ESB\",\"MultiAirportCityInd\": false},\"CabinPreferences\": [{\"Cabin\": \"ECONOMY\"}]},{\"DepartureDateTime\": {\"WindowAfter\": \"P0D\",\"WindowBefore\": \"P0D\",\"Date\": \"19MAY\"},\"OriginLocation\": {\"LocationCode\": \"ESB\",\"MultiAirportCityInd\": true},\"DestinationLocation\": {\"LocationCode\": \"IST\",\"MultiAirportCityInd\": false},\"CabinPreferences\": [{\"Cabin\": \"ECONOMY\"}]}]} \n ''' \n Can you make a request for " + PassengerQuantity + " passengers, from " + OriginLocation + " to " + DestinationLocation + " on " + TimeInterval + " ? If origin or destination location is a country, input that country's capital city's 3 letter code (eg. ROM for Italy). For the returning flight, set MultiAirportCityInd of origin location true. on OriginDestinationInformation[0], origin Location is "+ OriginLocation +". for OriginDestinationInformation[1] vice versa. Just return the request.",

                max_tokens: 3000,
                temperature: 0.2,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY_GPT}`,
                },
            }
        );
        const body = response.data.choices[0].text;
        console.log(body);
        // send request to api
        const response2 = await axios.post(url, body, {
            headers: {
                'Content-Type': 'application/json',
                'apikey': apikey,
                'apisecret': apisecret
            }
        });
        console.log(response2.data);
        //summarize the response using openai api
        const response3 = await axios.post(
            'https://api.openai.com/v1/completions',
            {
                model: "text-davinci-003",
                prompt: "Turkish Airlines has an API to get avalible flights. Response for the request is: \n ''' "+ JSON.stringify(response2.data) + " \n ''' \n Can you list avaliable flights for both ways briefly? ",
                max_tokens: 1000,
                temperature: 0.2,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY_GPT}`,
                },
            }
        );
        const summary = response3.data.choices[0].text;
        console.log(summary);
        //ask gpt3 to generate a flight plan. Use openai api.
        const response4 = await axios.post(
            'https://api.openai.com/v1/completions',
            {
                model: "text-davinci-003",
                prompt: "I want you to act as a travel guide. Create a personalized travel itinerary for a trip to a specific destination, keeping in mind the traveler's budget, interests, preferred travel style, accommodation, and transportation.Please include details for each day such as recommended activities, restaurants, and local attractions to visit, estimated costs for each day. Additionally, include details on how to get around the destination, such options, and recommendations for accommodations that align with the traveler's preferences. Please provide a that would make for a comfortable and enjoyable trip. (Example: <div> <b style=\"color: #45b398\"> Day 1: <br /> </b> <b> Transport: </b> You can take TK1362 flight for 02 June to Fly into Barcelona El Prat Airport (BCN). Departure time is 06:55 and arives at 10:35. Take the Aerobus to Plaça de Catalunya ($6).\n <b> Accomidation:</b> Check into your budget-friendly Airbnb or hotel in the El Raval or Gothic Quarter neighborhoods ($night).\n <b>Places: </b> Walk around the Gothic Quarter, visiting Barcelona Cathedral, Plaça Reial, and Plaça de Sant Jaume.\n <b> Activities:</b> Join a free walking tour of the Gothic Quarter (~$5-10 suggested tip for the guide).\n <b> Food: </b> Have breakfast at Granja La Pallaresa (churros and hot chocolate, ~$10), lunch at Quimet & Quimet (~$15), and dinner at La Taqueria (Mexican cuisine, ~$20). \n <b>Estimated Cost: </b> $121\n </div> <hr class=\"dashed\"> <div> <b style=\"color: #45b398\"> Day 2: <br /> </b> <b> Transport: </b> ...\n <b>Places: </b> ...\n <b> Activities:</b>...\n <b> Food: </b>... \n Estimated Cost: < b> $150 <br /> </div>) \n\n The trip should last for a specified duration, and the final itinerary should be presented in an HTML format. must write title's bold, add newline between days).You should write plan for these informations: destination: "+ DestinationLocation +", budget:"+ budget  +", duration: "+ duration +", interests: "+ interests +", accommodation: "+ accommodation +", travel style: "+ travelStyle +", transportation: "+ transportation +". Summary of flight details for that days: '''"+summary+"'''. If there is no flights avaliable from origin to destination, write 'No avaliable flight' to the first day. .",
                max_tokens: 2000,
                temperature: 0.2,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY_GPT}`,
                },
            }
        );
        const plan = response4.data.choices[0].text;
        console.log(plan);
        res.send(plan);
    } catch (error) {
        console.error('Error calling GPT API:', error);
        res.send(error);
    }
}
);

// get access token from amadeus api
const amadeusUrl = 'https://test.api.amadeus.com/v1/security/oauth2/token';
const getToken = async () => {
    try {
        //post with x-www-form-urlencoded
        const response = await axios.post(amadeusUrl, qs.stringify({
            grant_type: 'client_credentials',
            client_id: amadeusAPIKey,
            client_secret: amadeusAPISecret
        }));


        return response.data.access_token;
    } catch (error) {
        console.error(error);
    }
};

//get hotels from amadeus api
app.post('/hotels', [check('cityCode', 'cityCode is required').not().isEmpty()], async (req, res) => {
    try {
        const token = await getToken();
        const { cityCode } = req.body;

        const response = await axios.get(
            "https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?radius=101&radiusUnit=KM&ratings=5&hotelSource=ALL&cityCode="+ cityCode +"&amenities=Restaurant",
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        res.send(response.data);
    } catch (error) {
        console.error(error);
        res.send(error);
    }
});

//get city code from gpt3
app.post('/cityCode', [check('cityName', 'cityName is required').not().isEmpty()], async (req, res) => {
    try {
        const { cityName } = req.body;
        const response = await axios.post(
            'https://api.openai.com/v1/completions',
            {
                model: "text-davinci-003",
                prompt: "return 3 letter city code of the city: "+ cityName +" in this format: {\"cityCode\": } just return the result, don't write any text.",
                max_tokens: 2000,
                temperature: 0.2,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY_GPT}`,
                },
            }
        );
        const cityCode = response.data.choices[0].text;
        console.log(cityCode);
        res.send(cityCode);
    } catch (error) {
        console.error(error);
        res.send(error);
    }
});

//get tours and activities from amadeus api
app.post('/tours', [check('cityCode', 'cityCode is required').not().isEmpty()], async (req, res) => {
    try {
        const token = await getToken();
        const { cityCode } = req.body;
        // get latitude and longitude of the city from gpt3
        const response4 = await axios.post(
            'https://api.openai.com/v1/completions',
            {
                model: "text-davinci-003",
                prompt: "return latitude and longitude of the city: "+ cityCode +" in this format: {\"latitude\": , \"longitude\": } just return the result, don't write any text.",
                max_tokens: 2000,
                temperature: 0.2,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY_GPT}`,
                },
            }
        );
        //clean the result
        const latLon = JSON.parse(response4.data.choices[0].text);
        console.log(latLon);
        //{latitude: 41.00718394270184, longitude: 29.06698499948516}
        const response = await axios.get(
            "https://test.api.amadeus.com/v1/shopping/activities?latitude="+ latLon.latitude +"&longitude="+ latLon.longitude +"&radius=15",
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        res.send(response.data);
    } catch (error) {
        console.error(error);
        res.send(error);
    }
});



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
