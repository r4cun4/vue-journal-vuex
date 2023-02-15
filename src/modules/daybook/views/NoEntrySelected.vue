<template>
  <div class="d-flex justify-content-center">
    <h1 class="align-self-center">No hay nada seleccionado</h1>
  </div>

  <TheFab />
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
    components: {
        TheFab: defineAsyncComponent( () => import('../components/TheFab.vue'))
    }
}
</script>


<style lang="scss" scoped>
div {
    height: 100%;
}
</style>