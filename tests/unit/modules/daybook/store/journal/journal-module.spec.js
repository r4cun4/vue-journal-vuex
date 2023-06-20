
import { createStore } from 'vuex'
import journalModule from '@/modules/daybook/store/journal'
import { journalState } from '../../../../mock-data/test-journal-state'

import authApi from '@/api/authApi'

const createVuexStore = ( initialState ) =>
    createStore({
        modules: {
            journalModule: {
                ...journalModule,
                state: { ...initialState }
            }
        }
    })

describe('Vuex - Pruebas en el Journal Module', () => {

    beforeAll( async() => {

        const { data } = await authApi.post(':signInWithPassword', {
            email: 'test@test.com',
            password: '123456',
            returnSecureToken: true
        })

        localStorage.setItem( 'idToken', data.idToken )

    })

    // Basicas
    test('este es el estado inicial, debe de tener este state', () => {

        const store = createVuexStore( journalState )
        const { isLoading, entries } = store.state.journalModule
        
        expect( isLoading ).toBeFalsy()
        expect( entries ).toEqual( journalState.entries )

    })

    // Mutations

    test('mutation: setEntries', () => {

        const store = createVuexStore({ isLoading: true, entries: [] })

        store.commit('journalModule/setEntries', journalState.entries)

        expect( store.state.journalModule.entries.length ).toBe(2)
        expect( store.state.journalModule.isLoading ).toBeFalsy()

    })

    test('mutation: updateEntry', () => {

        const store = createVuexStore( journalState )

        const updatedEntry = {
            id: '-NPSw_XMR-dMQr7gfm0g',
            date: 1677687142190,
            text: "Lola te amo"
        }

        store.commit( 'journalModule/updateEntry', updatedEntry )

        const storeEntries = store.state.journalModule.entries 

        expect( store.state.journalModule.entries.length ).toBe(2)
        expect(
            storeEntries.find( e => e.id === updatedEntry.id )
        )


    })

    test('mutation: addEntry deleteEntry', () => {

        const store = createVuexStore( journalState )

        store.commit('journalModule/addEntry', { id: 'ABC-123', text: 'Hola Mundo' })

        const stateEntries = store.state.journalModule.entries

        expect( stateEntries.length ).toBe(3)
        expect( stateEntries.find( e => e.id === 'ABC-123') ).toBeTruthy()

        store.commit('journalModule/deleteEntry', 'ABC-123')
        expect( store.state.journalModule.entries.length ).toBe(2)
        expect( store.state.journalModule.entries.find( e => e.id === 'ABC-123') ).toBeFalsy()
    })

    // Getters
    test('getters: getEntriesByTerm getEntriesById', () => {

        const store = createVuexStore( journalState )

        const [ entry1, entry2 ] = journalState.entries

        expect( store.getters['journalModule/getEntriesByTerm']('').length).toBe(2)

        expect( store.getters['journalModule/getEntriesByTerm']('sarasa') ).toEqual([ entry2 ])

        expect( store.getters['journalModule/getEntriesById']('-NPSw_XMR-dMQr7gfm0g') ).toEqual( entry1 )

    })

    // Actions
    test('actions: loadEntries', async() => {

        const store = createVuexStore({ isLoading: true, entries: [] })

        await store.dispatch('journalModule/loadEntries')

        expect( store.state.journalModule.entries.length ).toBe(2)


    })

    test('actions: updateEntry', async() => {

        const store = createVuexStore( journalState )

        const updatedEntry = {
            id: '-NPSw_XMR-dMQr7gfm0g',
            date: 1677687142190,
            text: "Lola te amo desde mock data",
            otroCampo: true,
            otroMas: { a:1 }
        }

        await store.dispatch('journalModule/updateEntry', updatedEntry)

        expect( store.state.journalModule.entries.length ).toBe(2)
        expect(
            store.state.journalModule.entries.find( e => e.id === updatedEntry.id )
            ).toEqual({
                id: '-NPSw_XMR-dMQr7gfm0g',
                date: 1677687142190,
                text: "Lola te amo desde mock data",
            })
    })
})