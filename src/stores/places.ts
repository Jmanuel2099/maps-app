import { defineStore } from 'pinia'

interface PlacesSate {
    isLoading: boolean;
    userLocation?: [number, number]; // Longitude, Latitude
}

export const usePlacesStore = defineStore('places', {
    state: (): PlacesSate => ({
        isLoading: true,
        userLocation: undefined,

    }),
    getters: {
        isUserLocationReady: (state): boolean => !!state.userLocation
    },
    actions: {
        initUserLocation() {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { longitude, latitude } = position.coords;
                    this.userLocation = [longitude, latitude]
                },
                (err) => {
                    console.log(err);
                    throw new Error('Failed to establish an initial position ')
                }
            );

        }
    }
})