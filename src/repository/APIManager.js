import Axios from './axios';

const fetchDynamicData = () => {
    const collectSortedKeys = (dataArray) => {
        let keys = new Set()
        dataArray.forEach(obj => {
            for (let k in obj) {
                keys.add(k)
            }
        })
        return keys
    }

    return Axios.get("/exchanges")
        .then(resp => {
            return resp.data
        }).then(dataArray => {
            let keys = collectSortedKeys(dataArray)
            return {
                keys: keys,
                dataArray: dataArray
            }
        }).catch(err => {
            return {
                keys: new Set(),
                dataArray: []
            }
        })
}

export default {
    fetchDynamicData
}