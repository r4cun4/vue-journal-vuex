import { shallowMount } from '@vue/test-utils'
import { createStore } from 'vuex'

import journal from '@/modules/daybook/store/journal'
import EntryList from '@/modules/daybook/components/EntryList'

import { journalState } from '../../../mock-data/test-journal-state'


const createVuexStore = ( initialState ) =>
    createStore({
        modules: {
            journalModule: {
                ...journal,
                state: { ...initialState }
            }
        }
    })

describe('Pruebas en EntryList', () => {

    const store = createVuexStore( journalState )
    const mockRouter = {
        push: jest.fn()
    }

    let wrapper

    beforeEach(() => {
        jest.clearAllMocks()
        wrapper = shallowMount( EntryList, {
            global: {
                mocks: {
                    $router: mockRouter 
                },
                plugins: [ store ]
            }
        })
    })

    test('debe de llamar el getEntriesByTerm sin termino y mostrar 2 entradas', () => {

        expect(wrapper.findAll('the-entry-stub').length).toBe(2);
        expect( wrapper.html() ).toMatchSnapshot()

    })

    test('debe de llamar el getEntriesByTerm y filtrar las entradas', async() => {

        const input = wrapper.find('input')
        await input.setValue('sarasa')

        expect(wrapper.findAll('the-entry-stub').length).toBe(1)

    })

    test('el boton de nuevo debe de redireccionar a /new', async() => {

        wrapper.find('button').trigger('click')

        expect(mockRouter.push)
            .toHaveBeenCalledWith({ name: 'entry', params: { id: 'new' } })

    })

})