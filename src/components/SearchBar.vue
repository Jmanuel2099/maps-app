<script setup lang="ts">
import { ref, computed } from 'vue';

import { usePlaces } from '@/composables/usePlaces';
import SearchsResults from './SearchsResults.vue'

const debouncedValue = ref('')
const debounceTimeout = ref()
const {searchPlacesByTerm} = usePlaces();

const searchTerm = computed({
    get(){
        return debouncedValue.value;
    },
    set(val: string){
        if (debounceTimeout.value) clearTimeout(debounceTimeout.value) 

        debounceTimeout.value = setTimeout(() => {
            debouncedValue.value = val
            searchPlacesByTerm(val)
        }, 1000);
        
    }
 })

</script>

<template>
    <div class="searchbar-container">
        <input v-model="searchTerm" class="form-control" type="text" placeholder="Search place..." />
        <SearchsResults />
    </div>
</template>

<style scoped>
.searchbar-container {
    position: fixed;
    top: 30px;
    left: 30px;
    background-color: white;
    z-index: 9999;
    box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.2);
    width: 250px;
    border-radius: 10px !important;
    overflow: hidden;
    padding: 5px;
}
</style>