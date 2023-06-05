import 'setimmediate'
import cloudinary from 'cloudinary'
import axios from 'axios'

import uploadImage from "@/modules/daybook/helpers/uploadImage";

cloudinary.config({
    cloud_name:'dndnd3rdc',
    api_key:'227238787784831',
    api_secret:'Sqr620Q8iGN6dQ5is-WzTQ5shvM'
})


describe('pruebas en el uploadImage', () => {

    test('debe de cargar un archivo y retornar el url', async() => {

        const {data} = await axios.get('https://res.cloudinary.com/dndnd3rdc/image/upload/v1677759389/cld-sample-4.jpg', {
            responseType: 'arraybuffer'
        })

        const file = new File([ data ], 'foto.jpg')

        const image = await uploadImage( file )

        expect( typeof image.secure_url ).toBe('string')

        await cloudinary.v2.api.delete_resources( [image.public_id] )
    })

})