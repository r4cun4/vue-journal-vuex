import { shallowMount } from "@vue/test-utils"
import TheFab from "@/modules/daybook/components/TheFab"

describe('pruebas en el FAB component', () => {

    test('debe de mostrar el icono por defecto', () => {

        const wrapper = shallowMount( TheFab )
        const iTag = wrapper.find('i')

        expect( iTag.classes('fa-plus') ).toBeTruthy()

    })

    test('debe de mostrar el icono por argumento: fa-circle', () => {

        const wrapper = shallowMount( TheFab, {
            props: {
                icon: 'fa-circle'
            }
        })
        const iTag = wrapper.find('i')

        expect( iTag.classes('fa-circle') ).toBeTruthy()

    })

    test('debe de emitir el evento on:click cuando se hace click', () => {

        const wrapper = shallowMount( TheFab )

        wrapper.find('button').trigger('click')

        expect(wrapper.emitted('on:click')).toHaveLength(1)

    })
})