
const authEnable = () => {
    return {
        type: "ENABLE"
    }
}
const authDisable = () => {
    return {
        type: "DISABLE"
    }
}


module.exports = { authEnable, authDisable }