import journalApi from "@/api/journalApi"

// Las acciones pueden ser acciones asincronas que puede llamar una mutacion
export const loadEntries = async ({ commit }) => {

    const { data } = await journalApi.get('/entries.json')

    if ( !data ) {
        commit( 'setEntries', [] )
        return
    }

    const entries = []
    for( let id of Object.keys( data ) ) {
        entries.push({
            id,
            ...data[id]
        })
    }

    commit( 'setEntries', entries )

}

export const updateEntry = async ({ commit }, entry) => { // entry debe de ser un parametro

    console.log(entry, 'actions')

    const { date, picture, text } = entry
    const dataToSave = { date, picture, text }

    const resp = await journalApi.put( `/entries/${ entry.id }.json`, dataToSave )

    console.log(resp)

    commit ( 'updateEntry', { ...entry } )

}

export const createEntry = async ({ commit }, entry ) => {

    const { date, picture, text } = entry

    const dataToSave = { date, picture, text }

    const { data } = await journalApi.post( `entries.json`, dataToSave )

    // data = { "name" de firebase}

    dataToSave.id = data.name

    commit ( 'addEntry', dataToSave )

    return dataToSave.id

}

export const deleteEntry = async ({ commit }, id) => {

    await journalApi.delete( `/entries/${ id }.json`)

    commit ('deleteEntry', id)

    return id

}