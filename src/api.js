import axios from 'axios';


export const callGPTAPI = async (origin,interval,destination,budget,duration,interests,accommodation,travelStyle,transportation) => {
    try {
        console.log(origin,interval,destination,budget,duration,interests,accommodation,travelStyle,transportation);
        const response = await axios.post('http://localhost:5000/api', {
            "PassengerQuantity": "2",
            "TimeInterval": interval,
            "OriginLocation":origin,
            "DestinationLocation": destination,
            "budget":budget,
            "duration":duration,
            "interests":interests,
            "accommodation":accommodation,
            "travelStyle":travelStyle,
            "transportation":transportation
        });
        return response.data;
    } catch {
        console.log('error');
    }
};

export const getHotels = async (cityName) => {
    try {
        //get city code from api
        const responseCity = await axios.post('http://localhost:5000/cityCode', {
            "cityName": cityName
        });
        console.log(responseCity.data);
        const response = await axios.post('http://localhost:5000/hotels', {
            "cityCode": responseCity.data.cityCode?responseCity.data.cityCode:responseCity.data
        });
        return response.data;
    } catch {
        console.log('error');
    }
}

export const getTours = async (cityName) => {
    try {

        const response = await axios.post('http://localhost:5000/tours', {
            "cityCode": cityName
        });
        return response.data;
    } catch {
        console.log('error');
    }
}

