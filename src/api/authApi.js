
import axios from "axios"

const authApi = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts',
    params: {
        key: 'AIzaSyC08g4Kjrz-FGpMZifmLS9xHTsQq5fbqd0'
    }
})

export default authApi