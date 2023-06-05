import { shallowMount } from "@vue/test-utils"
import AboutView from '@/views/AboutView'

describe('Pruebas en el About View', () => {

    test('debe de renderizar el componente correctamente', () => {

        const wrapper = shallowMount( AboutView )
        expect( wrapper.html() ).toMatchSnapshot()

    })

}) 