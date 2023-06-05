import { shallowMount } from "@vue/test-utils";
import TheEntry from '@/modules/daybook/components/TheEntry'
import { journalState } from '../../../mock-data/test-journal-state';

describe('Pruebas en TheEntry component', () => {

    const mockRouter = {
        push: jest.fn()
    }

    const wrapper = shallowMount( TheEntry, {
        props: {
            entry: journalState.entries[0]
        },
        global: {
            mocks: {
                $router: mockRouter
            }
        }
    })

    test('debe de hacer match con el snapshot', () => {

        expect(wrapper.html()).toMatchSnapshot()

    })

    test('debe de redireccionar al hacer click en el entry-container', () => {

        const entryContainer = wrapper.find('.entry-container')
        entryContainer.trigger('click')

        expect( mockRouter.push ).toHaveBeenCalledWith({
                name: "entry",
                params: {
                    id: journalState.entries[0].id
                }
            })
    })

    test('pruebas en las propiedades computadas', () => {
        // console.log(wrapper.vm.day)
        // console.log(wrapper.vm.month)
        // console.log(wrapper.vm.yearDay)
        expect(wrapper.vm.day).toBe(1)
        expect(wrapper.vm.month).toBe('Marzo')
        expect(wrapper.vm.yearDay).toBe('2023, Miércoles')


    })

})