import {combineReducers, configureStore} from '@reduxjs/toolkit'
import reducer from './notes'

const rootReducer = combineReducers({notesReducer: reducer})

export function createStore() {
  return configureStore({
    reducer: rootReducer
  })
}