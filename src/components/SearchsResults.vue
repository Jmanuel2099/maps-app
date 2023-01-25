<script setup lang="ts">
import { useMap, usePlaces } from '../composables';
import type { Feature } from '../interfaces/places';
import { ref, watch } from 'vue';

const { places, isLoadingPlaces, userLocation } = usePlaces();
const { map, setPalceMarkers, getRouteBetweenTowPoints } = useMap();
const activePlace = ref('');

watch(places, (newPlaces) => {
    activePlace.value = '';
    setPalceMarkers(newPlaces);
});

const onPlaceClick = (place: Feature) => {
    activePlace.value = place.id
    const [lng, lat] = place.center;
    
    map?.value?.flyTo({
        center: [lng, lat],
        zoom: 14
    })
};

const getRouteDiretions = (place: Feature) => {
    if (!userLocation?.value) return;
    const [lng, lat] = place.center;

    const [startLng, startLat] = userLocation.value
    getRouteBetweenTowPoints([startLng, startLat], [lng, lat]);
};
</script>

<template>
    <div v-if="isLoadingPlaces" class="alert alert-primary text-center">
        <h5>Loading ...</h5>
        <span>Wait please !!</span>
    </div>

    <ul v-else-if="places.length > 0" class="list-group mt-3">
        <li v-for="place in places" :key="place.id" @click="onPlaceClick(place)"
            :class="{ 'active': place.id === activePlace }" class="list-group-item list-group-item-action">
            <h5>{{ place.text }}</h5>
            <p>{{ place.place_name }}</p>
            <div align="right">
                <button @click.self="getRouteDiretions(place)"
                    :class="(place.id === activePlace) ? 'btn-outline-light' : 'btn-outline-primary'"
                    class="btn btn-outline-primary btn-sm">
                    Go
                </button>
            </div>
        </li>

    </ul>
</template>

<style scoped>
li {
    cursor: pointer;
}

h5 {
    font-size: 15px !important;
}

p {
    font-size: 10px;
}
</style>