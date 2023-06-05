
import { createStore } from 'vuex'
import journal from '@/modules/daybook/store/journal'
import { journalState } from '../../../../mock-data/test-journal-state'

const createVuexStore = ( initialState ) =>
    createStore({
        modules: {
            journalModule: {
                ...journal,
                state: { ...initialState }
            }
        }
    })

describe('Vuex - Pruebas en el Journal Module', () => {
    // Basicas
    test('este es el estado inicial, debe de tener este state', () => {

        const store = createVuexStore( journalState )
        const { isLoading, entries } = store.state.journal
        
        expect( isLoading ).toBeFalsy()
        expect( entries ).toEqual( journalState.entries )

    })

    // Mutations

    test('mutation: setEntries', () => {

        const store = createVuexStore({ isLoading: true, entries: [] })

        store.commit('journal/setEntries', journalState.entries)

        expect( store.state.journal.entries.length ).toBe(2)
        expect( store.state.journal.isLoading ).toBeFalsy()

    })

    test('mutation: updateEntry', () => {

        const store = createVuexStore( journalState )

        const updatedEntry = {
            id: '-NPSw_XMR-dMQr7gfm0g',
            date: 1677687142190,
            text: "Lola te amo"
        }

        store.commit( 'journal/updateEntry', updatedEntry )

        const storeEntries = store.state.journal.entries 

        expect( store.state.journal.entries.length ).toBe(2)
        expect(
            storeEntries.find( e => e.id === updatedEntry.id )
        )


    })

    test('mutation: addEntry deleteEntry', () => {

        const store = createVuexStore( journalState )

        store.commit('journal/addEntry', { id: 'ABC-123', text: 'Hola Mundo' })

        const stateEntries = store.state.journal.entries

        expect( stateEntries.length ).toBe(3)
        expect( stateEntries.find( e => e.id === 'ABC-123') ).toBeTruthy()

        store.commit('journal/deleteEntry', 'ABC-123')
        expect( store.state.journal.entries.length ).toBe(2)
        expect( store.state.journal.entries.find( e => e.id === 'ABC-123') ).toBeFalsy()
    })

    // Getters
    test('getters: getEntriesByTerm getEntriesById', () => {

        const store = createVuexStore( journalState )

        const [ entry1, entry2 ] = journalState.entries

        expect( store.getters['journal/getEntriesByTerm']('').length).toBe(2)

        expect( store.getters['journal/getEntriesByTerm']('sarasa') ).toEqual([ entry2 ])

        expect( store.getters['journal/getEntriesById']('-NPSw_XMR-dMQr7gfm0g') ).toEqual( entry1 )

    })

    // Actions
    test('actions: loadEntries', async() => {

        const store = createVuexStore({ isLoading: true, entries: [] })

        await store.dispatch('journal/loadEntries')

        expect( store.state.journal.entries.length ).toBe(2)


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

        await store.dispatch('journal/updateEntry', updatedEntry)

        expect( store.state.journal.entries.length ).toBe(2)
        expect(
            store.state.journal.entries.find( e => e.id === updatedEntry.id )
            ).toEqual({
                id: '-NPSw_XMR-dMQr7gfm0g',
                date: 1677687142190,
                text: "Lola te amo desde mock data",
            })
    })
})