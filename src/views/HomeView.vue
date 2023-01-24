<script setup lang="ts">
import { usePlaces } from '../composables/usePlaces';
import MapView from '../components/MapView.vue';
import CurrentLocationBtn from '@/components/currentLocationBtn.vue';

const { } = usePlaces();

</script>

<template>
  <MapView />
  <CurrentLocationBtn/>
</template>
