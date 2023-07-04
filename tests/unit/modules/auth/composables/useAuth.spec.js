import useAuth from '@/modules/auth/composables/useAuth'

const mockStore = {
    // Los dispatch son las acciones
    dispatch: jest.fn(),
    // Los commits son las mutaciones
    commit: jest.fn(),
    // Los getters son un objeto
    getters: {
        'authModule/currentState': 'authenticated',
        'authModule/username': 'Rodrigo'
    }
}

jest.mock('vuex', () => ({
    useStore: () => mockStore
}))

describe('Pruebas en useAuth', () => {

    beforeEach( () => jest.clearAllMocks() )

    test('createUser exitoso', async() => {

        const { createUser } = useAuth()

        const newUser = { name: 'Rodrigo', email: 'rodrigo@gmail.com' }
        mockStore.dispatch.mockReturnValue({ ok: true })

        const resp = await createUser( newUser )

        expect(mockStore.dispatch).toHaveBeenCalledWith("authModule/createUser", {"email": "rodrigo@gmail.com", "name": "Rodrigo"})
        expect(resp).toEqual({ ok: true })

    })

    test('createUser fallido, porque el usuario ya existe', async() => {

        const { createUser } = useAuth()

        const newUser = { name: 'Rodrigo', email: 'rodrigo@gmail.com' }
        mockStore.dispatch.mockReturnValue({ ok: false, message: 'EMAIL_EXISTS' })

        const resp = await createUser( newUser )

        expect(mockStore.dispatch).toHaveBeenCalledWith("authModule/createUser", newUser)
        expect(resp).toEqual({ ok: false, message: 'EMAIL_EXISTS' })

    })

    test('login exitoso', async() => {

        const { loginUser } = useAuth()

        const loginForm = { email: 'rodrigo@gmail.com', password: '123456' }
        mockStore.dispatch.mockReturnValue({ ok: true })

        const resp = await loginUser( loginForm )

        expect(mockStore.dispatch).toHaveBeenCalledWith("authModule/signInUser", loginForm)
        expect(resp).toEqual({ ok: true })

    })

    test('login fallido', async() => {

        const { loginUser } = useAuth()

        const loginForm = { email: 'rodrigo@gmail.com', password: '123456' }
        mockStore.dispatch.mockReturnValue({ ok: false, message: 'EMAIL/PASSWORD do not exist' })

        const resp = await loginUser( loginForm )

        expect(mockStore.dispatch).toHaveBeenCalledWith("authModule/signInUser", loginForm)
        expect(resp).toEqual({ ok: false, message: 'EMAIL/PASSWORD do not exist' })

    })

    test('checkAuthStatus', async() => {

        const { checkAuthStatus } = useAuth()

        mockStore.dispatch.mockReturnValue({ ok: true })

        const resp = await checkAuthStatus()

        expect(mockStore.dispatch).toHaveBeenCalledWith("authModule/checkAuthentication")
        expect(resp).toEqual({ ok: true })

    })

    test('logout', () => {

        const { logout } = useAuth()

        logout()

        expect(mockStore.commit).toHaveBeenCalledWith('authModule/logout')
        expect(mockStore.commit).toHaveBeenCalledWith('journalModule/clearEntries')

    })

    test('Computed: authState, username', () => {

        const { authStatus, username } = useAuth()

        console.log(authStatus.value)
        console.log(username.value)

        expect(authStatus.value).toBe('authenticated')
        expect(username.value).toBe('Rodrigo')

    })

})