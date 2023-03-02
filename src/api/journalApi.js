
import axios from "axios"

const journalApi = axios.create({
    baseURL: 'https://vue-demos-468eb-default-rtdb.firebaseio.com'
})

export default journalApi