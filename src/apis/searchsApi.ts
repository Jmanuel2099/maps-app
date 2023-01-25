import axios from 'axios';
const searchApi = axios.create({
    baseURL:'https://api.mapbox.com/geocoding/v5/mapbox.places',
    params:{
        limit: 4,
        language: 'en',
        access_token: 'your access token',
    }
});

export default searchApi;