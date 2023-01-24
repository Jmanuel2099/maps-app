<script setup lang="ts">
import { computed } from 'vue';
import { useMap, usePlaces } from '@/composables';


const { userLocation, isUserLocationReady } = usePlaces();
const { map, isMapReady } = useMap();

const isConditionsBtnReady = computed((): boolean => isMapReady.value && isUserLocationReady.value)

const onCurrentLocation = () => {
    map?.value?.flyTo({
        center: userLocation?.value,
        zoom: 14
    });
};

</script>

<template>
    <button v-if="isConditionsBtnReady" @click="onCurrentLocation" class="btn btn-primary">
        Current location
    </button>

</template>

<style scoped>
button {
    position: fixed;
    top: 30px;
    right: 30px;
}
</style>