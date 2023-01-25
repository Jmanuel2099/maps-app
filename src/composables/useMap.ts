import type { Feature } from "@/interfaces/places";
import { useMapStore, type LngLatn } from "@/stores/map";
import type mapboxgl from "mapbox-gl";
import { storeToRefs } from "pinia";

export const useMap = () => {
    const mapStore = useMapStore();
    const { map, markers, distance, duration, isMapReady } = storeToRefs(mapStore);

    const setMap = (map: mapboxgl.Map) => {
        mapStore.setMap(map);
    };

    const setPalceMarkers = (places: Feature[]) => {
        mapStore.setPlaceMarkers(places);
    };

    const getRouteBetweenTowPoints = (start: LngLatn, end: LngLatn) => {
        mapStore.getRouteBetweenTowPoints({start, end})
    };

    return {
        //state
        map,
        markers,
        distance,
        duration,
        //getters
        isMapReady,
        //actions
        setMap,
        setPalceMarkers,
        getRouteBetweenTowPoints,
    };
};