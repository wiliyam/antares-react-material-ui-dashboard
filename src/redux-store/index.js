/* eslint-disable semi */
/* eslint-disable quotes */
import { combineReducers } from 'redux'
import { createStore } from 'redux'

const reducer = require("./reducers")

const AllReducer = combineReducers({
    data: reducer.reducer
})

const store = createStore(AllReducer)

console.log("-----------------------------")

store.subscribe(() => {
    console.log('state\n', store.getState());
    // debugger;
});

export default store
