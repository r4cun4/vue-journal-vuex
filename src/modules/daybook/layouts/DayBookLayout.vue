<template>
    <Navbar />

    <div v-if="isLoading"
        class="row justify-content-md-center">
        <div class="col-3 alert-info text-center mt-5">
            Espere por favor...
            <h3 class="mt-2">
                <i class="fa fa-spin fa-sync"></i>
            </h3>
        </div>
    </div>

    <div v-else
        class="d-flex">
        <div class="col-4">
            <EntryList />
        </div>
        <div class="col">
            <router-view />
        </div>
    </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapActions, mapState } from 'vuex'

export default {
    components: {
        Navbar: defineAsyncComponent(() => import('../components/TheNavbar.vue')),
        EntryList: defineAsyncComponent(() => import('../components/EntryList.vue')),
    },
    methods: {
        ...mapActions('journalModule', ['loadEntries'])
    },
    // cuando se necesita informacion del state se utilizan las propiedades computadas. La informacion queda disponible para usar en todo el componente
    computed: {
        ...mapState('journalModule', ['isLoading'])
    },
    created() {
        this.loadEntries()
    }
}
</script>
