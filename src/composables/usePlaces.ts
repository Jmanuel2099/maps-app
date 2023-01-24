import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';

import { usePlacesStore } from '../stores/places'

export const usePlaces = () => {

    const placesStore = usePlacesStore();
    const { userLocation, isUserLocationReady } = storeToRefs(placesStore);

    onMounted(() => {
        if (!placesStore.isUserLocationReady) {
            placesStore.initUserLocation();
        }
    })

    return {
        // State
        userLocation,

        //Getters
        isUserLocationReady

        //Actions
    }
}