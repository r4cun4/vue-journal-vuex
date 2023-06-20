import { shallowMount } from '@vue/test-utils'
import { createStore } from 'vuex'

import Swal from 'sweetalert2'

import journalModule from '@/modules/daybook/store/journal'
import { journalState } from '../../../mock-data/test-journal-state'

import EntryView from '@/modules/daybook/views/EntryView'

const createVuexStore = ( initialState ) =>
    createStore({
        modules: {
            journalModule: {
                ...journalModule,
                state: { ...initialState }
            }
        }
    })

jest.mock('sweetAlert2', () => ({
    fire: jest.fn(),
    showLoading: jest.fn(),
    close: jest.fn()
}))

describe('Pruebas en el EntryView', () => {

    const store = createVuexStore( journalState )
    store.dispatch = jest.fn()
    const mockRouter = {
        push: jest.fn()
    }

    let wrapper

    beforeEach(() => {
        jest.clearAllMocks()
        wrapper = shallowMount( EntryView, {
            props: {
                id: '-NPSw_XMR-dMQr7gfm0g'
            },
            global: {
                mocks: {
                    $router: mockRouter 
                },
                plugins: [ store ]
            }
        })
    })

    test('debe de sacar al usuario porque el id no existe', () => {

        const wrapper = shallowMount( EntryView, {
            props: {
                id: 'Este ID no existe en el STORE'
            },
            global: {
                mocks: {
                    $router: mockRouter
                },
                plugins: [store]
            }
        })

        expect( mockRouter.push ).toHaveBeenCalledWith({ name: 'no-entry' })

    })

    test('debe de mostrar la entrada correctamente', () => {

        expect(wrapper.html()).toMatchSnapshot()
        expect(mockRouter.push).not.toHaveBeenCalled()

    })

    test('debe de borrar la entrada y salida', ( done ) => {

        Swal.fire.mockReturnValueOnce(Promise.resolve({isConfirmed: true}))

        wrapper.find('.btn-danger').trigger('click')

        expect( Swal.fire ).toHaveBeenCalledWith({
            title: '¿Está seguro?',
            text: 'Una vez borrado, no se puede recuperar',
            showDenyButton: true,
            confirmButtonText: 'Si, estoy seguro'
        })

        setTimeout( () => {

            expect( store.dispatch ).toHaveBeenCalledWith('journalModule/deleteEntry', '-NPSw_XMR-dMQr7gfm0g')
            expect( mockRouter.push ).toHaveBeenCalled()
            done()

        }, 1)
    })

})