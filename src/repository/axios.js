import Axios from 'axios';

const instance = Axios.create ({
    baseURL: "https://api.coingecko.com/api/v3/"
})

export default instance