import { useMapStore } from "@/stores/map";
import type mapboxgl from "mapbox-gl";
import { storeToRefs } from "pinia";

export const useMap = () => {
    const mapStore = useMapStore();
    const { map, markers, distance, duration, isMapReady } = storeToRefs(mapStore);

    const setMap = (map: mapboxgl.Map) => {
        mapStore.setMap(map);
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
    };
};