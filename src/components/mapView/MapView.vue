<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { usePlaces } from '../../composables/usePlaces';
import mapboxgl from 'mapbox-gl';

const { userLocation, isUserLocationReady } = usePlaces();

const mapElement = ref<HTMLDivElement>();

onMounted(() => {
    if (isUserLocationReady.value) {
        initMap()
        return
    }
    console.log('No localization yet')
});

const initMap = async () => {
    if (!mapElement.value) throw new Error('Div element does not exist');
    if (!userLocation?.value) throw new Error('User location does not exist');
    await Promise.resolve();

    const map = new mapboxgl.Map({
        container: mapElement.value, // container ID
        style: 'mapbox://styles/mapbox/streets-v12', // style URL
        center: userLocation.value, // starting position [lng, lat]
        zoom: 15, // starting zoom
    });
};

watch(isUserLocationReady, (newVal) => {
    if (isUserLocationReady.value) initMap();
});
</script>

<template>
    <div v-if="!isUserLocationReady" class="loading-map d-flex justify-content-center align-items-center">
        <div class="text-center">
            <h3> Wait, please!!</h3>
            <span>Loading ...</span>
        </div>
    </div>
    <div v-show="isUserLocationReady" class="map-container" ref="mapElement">
    </div>
</template>

<style scoped>
.loading-map {
    color: white;
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 100vh;
    z-index: 9999;
    background-color: rgba(0, 0, 0, 0.8);
}

.map-container {
    position: fixed;
    width: 100vw;
    height: 100vh;
}
</style>