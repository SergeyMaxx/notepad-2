import {combineReducers, configureStore} from '@reduxjs/toolkit'
import reducer from './notes'
// import authReducer from './auth'

const rootReducer = combineReducers({
  notesReducer: reducer,
  // authReducer
})

export function createStore() {
  return configureStore({
    reducer: rootReducer
  })
}