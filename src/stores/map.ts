import type mapboxgl from "mapbox-gl";
import { defineStore } from "pinia";

interface MapState {
    map?: mapboxgl.Map;
    markers: mapboxgl.Marker[];
    distance?: number;
    duration?: number;
}

export const useMapStore = defineStore('map', {
    state: (): MapState => ({
        map: undefined,
        markers: [],
        distance: undefined,
        duration: undefined,
    }),
    getters: {
        isMapReady: (state): boolean => !!state.map

    },
    actions: {
        setMap(map: mapboxgl.Map) {
            this.map = map
        }
    }
});