import {createAction, createSlice} from '@reduxjs/toolkit'
import {setError} from './errors'
import noteService from '../services/note.service'

const noteSlice = createSlice({
  name: 'notes',
  initialState: {
    noteState: JSON.parse(localStorage.getItem('notes-react')) || [],
    basketState: JSON.parse(localStorage.getItem('notesBasket-react')) || [],
    favoritesState:JSON.parse(localStorage.getItem('notesFavorites-react')) || []
  },
  reducers: {
    // received(state, action) {
    //   state.noteState = action.payload
    //   state.basketState = action.payload
    //   state.favoritesState = action.payload
    // },
    newNotes(state, action) {
      state.noteState.push(action.payload)
    },
    edit(state, action) {
      const noteIndex = state.noteState.findIndex(el => el.id === action.payload.id)
      state.noteState[noteIndex] = {
        ...state.noteState[noteIndex],
        ...action.payload
      }

      const index = state.favoritesState.findIndex(el => el.id === action.payload.id)
      state.favoritesState[index] = {
        ...state.favoritesState[index],
        ...action.payload
      }
    },
    remove(state, action) {
      state.basketState = [
        ...state.basketState,
        ...state.noteState.filter(el => el.id === action.payload.id)
      ]
      state.noteState = [...state.noteState.filter(el => el.id !== action.payload.id)]
      state.favoritesState = [...state.favoritesState.filter(el => el.id !== action.payload.id)]
    },
    removeAll(state) {
      state.basketState = []
    },
    restore(state, action) {
      const newStatus = state.basketState.find(el => el.id === action.payload.id)

      if (newStatus.favoritesStatus) {
        state.noteState = [
          ...state.noteState,
          ...state.basketState.filter(el => el.id === action.payload.id)
        ]
        state.favoritesState = [
          ...state.favoritesState,
          ...state.basketState.filter(el => el.id === action.payload.id)
        ]
        state.basketState = [...state.basketState.filter(el => el.id !== action.payload.id)]
      } else {
        state.noteState = [
          ...state.noteState,
          ...state.basketState.filter(el => el.id === action.payload.id)
        ]
        state.basketState = [...state.basketState.filter(el => el.id !== action.payload.id)]
      }
    },
    toggle(state, action) {
      const newStatus = state.noteState.find(el => el.id === action.payload.id)
      newStatus.favoritesStatus = !newStatus.favoritesStatus
      state.noteState = [...state.noteState]
    },
    favorites(state, action) {
      const status = state.noteState.find(note => note.id === action.payload.id)
      status.favoritesStatus
        ? state.favoritesState = [
          ...state.favoritesState,
          ...state.noteState.filter(el => el.id === action.payload.id)
        ]
        : state.favoritesState = [...state.favoritesState.filter(el => el.id !== action.payload.id)]
    },
    cancelFavorites(state, action) {
      const status = state.favoritesState.find(el => el.id === action.payload.id)
      status.favoritesStatus = !status.favoritesStatus
      state.favoritesState = [...state.favoritesState]

      const newStatus = state.noteState.find(el => el.id === action.payload.id)
      newStatus.favoritesStatus = !newStatus.favoritesStatus
      state.noteState = [...state.noteState]
    },
    deleteFavorites(state, action) {
      state.favoritesState = [...state.favoritesState.filter(el => el.id !== action.payload.id)]
    },
    editFavorites(state, action) {
      const index = state.favoritesState.findIndex(el => el.id === action.payload.id)
      state.favoritesState[index] = {
        ...state.favoritesState[index],
        ...action.payload
      }

      const noteIndex = state.noteState.findIndex(el => el.id === action.payload.id)
      state.noteState[noteIndex] = {
        ...state.noteState[noteIndex],
        ...action.payload
      }
    }
  }
})

const {reducer} = noteSlice
const {
  // received,
  newNotes,
  edit,
  remove,
  removeAll,
  restore,
  favorites,
  cancelFavorites,
  toggle,
  deleteFavorites,
  editFavorites
} = noteSlice.actions

// export const loadNotes = payload => {
//   return async dispatch => {
//     try {
//       const data = await noteService.create(payload)
//       dispatch(received(data))
//
//     } catch (error) {
//       dispatch(setError(error.message))
//     }
//   }
// }
//
// const noteRequested = createAction('notes/noteRequested')
//
// export const createNote = task => {
//   return async dispatch => {
//     dispatch(noteRequested())
//     try {
//       const {data} = await noteService.create(task)
//       dispatch(newNotes(data))
//
//     } catch (error) {
//       dispatch(setError(error.message))
//     }
//   }
// }

export const getNotes = () => state => state.notesReducer.noteState
export const getBasketNotes = () => state => state.notesReducer.basketState
export const getFavoritesNotes = () => state => state.notesReducer.favoritesState
export const createNote = data => newNotes(data)
export const change = data => edit(data)
export const noteDelete = id => remove(id)
export const noteDeleteAll = () => removeAll()
export const noteReturn = id => restore(id)
export const addFavorites = id => favorites(id)
export const favoritesOff = id => cancelFavorites(id)
export const removeFavorites = id => deleteFavorites(id)
export const toggleFavorites = id => toggle(id)
export const changeFavoritesNote = id => editFavorites(id)
export default reducer