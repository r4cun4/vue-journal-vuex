import { createStore } from 'vuex'

import authModule from '@/modules/auth/store/auth'
import journalModule from '@/modules/daybook/store/journal'

const store = createStore({
    modules: {
        authModule,
        journalModule
    }
})

export default store