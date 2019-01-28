const isNumeric = (val) => {
    return val !== ''
        && typeof(val) !== 'boolean'
        && val !== null
        && val !== []
        && !isNaN(val)
}

export default {
    isNumeric
}