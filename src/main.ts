import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');" 
mapboxgl.accessToken = 'your access token';

if (!navigator.geolocation){
    alert('your browser does not support Geolocation');
    throw new Error('your browser does not support Geolocation');
}

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount("#app");


