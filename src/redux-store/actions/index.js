
const loadingEnable = () => {
    return {
        type: "LOADING_ENABLE"
    }
}
const loadingDisable = () => {
    return {
        type: "LOADING_DISABLE"
    }
}


module.exports = { loadingEnable, loadingDisable }