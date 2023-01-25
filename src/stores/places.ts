import { searchApi } from '@/apis';
import type { Feature, PlacesResponse } from '@/interfaces/places';
import { defineStore } from 'pinia'

interface PlacesSate {
    isLoading: boolean;
    userLocation?: [number, number]; // Longitude, Latitude
    isLoadingPlaces: boolean;
    places: Feature[];
}

export const usePlacesStore = defineStore('places', {
    state: (): PlacesSate => ({
        isLoading: true,
        userLocation: undefined,
        isLoadingPlaces: false,
        places: [],
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
        },

        setIsLoadingPlaces() {
            this.isLoadingPlaces = true;
        },

        setPalces(places: Feature[]) {
            this.places = places;
            this.isLoadingPlaces = false;
        },

        async searchPlacesByTerm(query: string): Promise<Feature[]> {
            if (query.length === 0) {
                this.setPalces([]);
                return [];
            }
            if (!this.userLocation) {
                throw new Error('Does not user location ');
            }

            this.setIsLoadingPlaces();
            const response = await searchApi.get<PlacesResponse>(`${query}.json`, {
                params: {
                    proximity: this.userLocation?.join(','),
                }
            });
            console.log(response.data)
            this.setPalces(response.data.features);
            return response.data.features;
        },

    },
})