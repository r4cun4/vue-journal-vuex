<template>
  <div class="d-flex justify-content-center">
    <h1 class="align-self-center">No hay nada seleccionado</h1>
  </div>

  <TheFab
    @on:click="createNewEntry"
  />
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
    name: 'NoEntrySelected',
    components: {
        TheFab: defineAsyncComponent( () => import('../components/TheFab.vue'))
    },
    methods: {
      createNewEntry() {
        this.$router.push({ name:'entry', params: { id:'new' } })
      }
    }
}
</script>


<style lang="scss" scoped>
div {
    height: 100%;
}
</style>