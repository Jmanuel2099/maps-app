<script setup lang="ts">
import { usePlaces } from '../composables/usePlaces';
import MapView from '../components/mapView/MapView.vue';

const { } = usePlaces();

</script>

<template>
  <MapView />
</template>
