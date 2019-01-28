import { SET_DATA, SORT_BY_HEADER } from "./actions";

const initState = {
    headers: new Set(),
    dataArray: []
}

const reducer = (state = initState, action) => {

    switch (action.type) {
        case SET_DATA:
            return {
                ...state,
                ...action.data
            }
        case SORT_BY_HEADER:
            return {
                ...state,
                dataArray: sortByHeaderHandler(state, action.header)
            }
    }

    return state
}

const sortByHeaderHandler = (state, header) => {
    let dataArray = Array.from(state.dataArray)
    dataArray.sort((o1, o2) => {
        let v1 = o1[header]
        let v2 = o2[header]

        if (v1 == v2) {
            return 0
        } else if (v1 === null || v1 === '') {
            return 1
        } else if (v2 === null || v2 === '') {
            return -1
        } else if (v1 < v2) {
            return -1
        } else if (v1 > v2) {
            return 1
        } else {
            return 0
        }
    })

    return dataArray
}

export default reducer