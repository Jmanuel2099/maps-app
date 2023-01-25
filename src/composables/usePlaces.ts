import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';

import { usePlacesStore } from '../stores/places'

export const usePlaces = () => {

    const placesStore = usePlacesStore();
    const { userLocation, isUserLocationReady,places, isLoadingPlaces } = storeToRefs(placesStore);

    onMounted(() => {
        if (!placesStore.isUserLocationReady) {
            placesStore.initUserLocation();
        }
    });

    const searchPlacesByTerm = async (query='') => {
        
        placesStore.searchPlacesByTerm(query);
    };
    return {
        // State
        userLocation,
        places,
        isLoadingPlaces,
        //Getters
        isUserLocationReady,
        //Actions
        searchPlacesByTerm
    };
};