import store from "@/store"

const isAuthenticatedGuard = async( to, from, next ) => {

    const { ok } = await store.dispatch('authModule/checkAuthentication')

    if( ok ) next()
    else next({ name: 'login' })

}

export default isAuthenticatedGuard