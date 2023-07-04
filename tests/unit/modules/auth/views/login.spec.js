import { shallowMount } from '@vue/test-utils'
import LoginView from '@/modules/auth/views/LoginView'

import createVuexStore from '../../../mock-data/mock-store'

import Swal from 'sweetalert2'

jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
    showLoading: jest.fn(),
    close: jest.fn(),
}))

describe('Pruebas en el LoginView component', () => {

    const store = createVuexStore({
        status: 'not-authenticated',
        user: 'null',
        idToken: 'null',
        refreshToken: 'null'
    })

    store.dispatch = jest.fn()

    beforeEach(() => jest.clearAllMocks())

    test('debe de hacer match con el snapshot', () => {

        const wrapper = shallowMount( LoginView, {
            global: {
                plugins: [ store ]
            }
        })

        expect(wrapper.html()).toMatchSnapshot()

    })

    test('credenciales incorrectas, disparar el SWAL', async() => {

        store.dispatch.mockReturnValueOnce({ ok: false, message: 'Error en credenciales' })

        const wrapper = shallowMount( LoginView, {
            global: {
                plugins: [ store ]
            }
        })

        await wrapper.find('form').trigger('submit')
        expect(store.dispatch).toHaveBeenCalledWith('authModule/signInUser', { email: '', password: '' })
        expect(Swal.fire).toHaveBeenCalledWith('Error', 'Error en credenciales', 'error')

    })

    test('debe de redirigir a la ruta no-entry', async() => {

        store.dispatch.mockReturnValueOnce({ ok: true })

        const wrapper = shallowMount( LoginView, {
            global: {
                plugins: [ store ]
            }
        })

        const [ txtEmail, txtPassword ] = wrapper.findAll('input')
        await txtEmail.setValue('rodrigo@gmail.com')
        await txtPassword.setValue('123456')

        await wrapper.find('form').trigger('submit')

        expect( store.dispatch ).toHaveBeenCalledWith('authModule/signInUser', { email: 'rodrigo@gmail.com', password: '123456' })
        expect( wrapper.router.push ).toHaveBeenCalledWith({ name: 'no-entry' })
    })

})