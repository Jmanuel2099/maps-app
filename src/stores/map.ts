import { defineStore } from "pinia";
import { directionsApi } from "@/apis";
import type { DirectionsResponse } from "../interfaces/directions";
import type { Feature } from "../interfaces/places";
import mapboxgl from "mapbox-gl";

interface MapState {
    map?: mapboxgl.Map;
    markers: mapboxgl.Marker[];
    distance?: number;
    duration?: number;
}

export type LngLatn = [number, number];

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
        },

        setDistanceDuration({ distance, duration }: { distance: number, duration: number }) {
            let kilometers = distance / 1000;
            kilometers = Math.round(kilometers * 100);
            kilometers /= 100;
            this.distance = kilometers;

            this.duration = Math.floor(duration / 60);
        },
        setPlaceMarkers(places: Feature[]) {
            if (!this.map) return;
            // clear markers list
            this.markers.forEach(marker => marker.remove());
            this.markers = [];

            //create new markers
            for (const place of places) {
                const [lng, lat] = place.center;

                const locationPopup = new mapboxgl.Popup()
                    .setLngLat([lng, lat])
                    .setHTML(`
                        <h4>${place.text}</h4>
                        <p>${place.place_name}</p>
                        `);

                const locationMarker = new mapboxgl.Marker()
                    .setLngLat([lng, lat])
                    .setPopup(locationPopup)
                    .addTo(this.map);

                this.markers.push(locationMarker);
            }
            //clear PolyLine
            if (this.map.getLayer('RouteString')) {
                this.map.removeLayer('RouteString');
                this.map.removeSource('RouteString');
                this.duration = undefined;
                this.distance = undefined;
            }
        },

        async getRouteBetweenTowPoints({ start, end }: { start: LngLatn, end: LngLatn }) {
            const response = await directionsApi.get<DirectionsResponse>(`${start.join(',')}; ${end.join(',')}`);
            this.setDistanceDuration({
                distance: response.data.routes[0].distance,
                duration: response.data.routes[0].duration,
            });
            this.setRoutePolyLine(response.data.routes[0].geometry.coordinates);
        },

        setRoutePolyLine(cords: number[][]) {
            const start = cords[0];
            const end = cords[cords.length - 1];

            // define bounds
            const bounds = new mapboxgl.LngLatBounds(
                [start[0], start[1]],
                [start[0], start[1]]
            );

            for (const cord of cords) {
                const newCord: [number, number] = [cord[0], cord[1]];
                bounds.extend(newCord);
            };

            this.map?.fitBounds(bounds, {
                padding: 200,
            });
            // draw polyLine
            const sourceData: mapboxgl.AnySourceData = {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: [
                        {
                            type: 'Feature',
                            properties: {},
                            geometry: {
                                type: 'LineString',
                                coordinates: cords
                            }
                        }
                    ]
                }
            };

            if (this.map?.getLayer('RouteString')) {
                this.map.removeLayer('RouteString');
                this.map.removeSource('RouteString');
            };

            this.map?.addSource('RouteString', sourceData);
            this.map?.addLayer({
                id: 'RouteString',
                type: 'line',
                source: 'RouteString',
                layout: {
                    'line-cap': 'round',
                    'line-join': 'round'
                },
                paint: {
                    'line-color': 'black',
                    'line-width': 3
                }
            });
        },
    },


});