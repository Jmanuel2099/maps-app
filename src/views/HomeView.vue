<script setup lang="ts">
import { usePlaces } from '../composables/usePlaces';
import MapView from '../components/MapView.vue';
import CurrentLocationBtn from '@/components/currentLocationBtn.vue';
import SearchBar from '@/components/SearchBar.vue';
import TripDetails from '@/components/TripDetails.vue';

const { } = usePlaces();

</script>

<template>
  <MapView />
  <SearchBar />
  <CurrentLocationBtn />
  <TripDetails />
</template>
