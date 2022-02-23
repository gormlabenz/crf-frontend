<template>
    <div class="flex justify-center items-center h-screen">
        <AGeolocation />
    </div>
</template>

<script>
import AGeolocation from './components/AGeolocation.vue'

export default {
    name: 'App',
    components: {
        AGeolocation,
    },
}
</script>

<style></style>
