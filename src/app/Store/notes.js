import {createAction, createSlice} from '@reduxjs/toolkit'
import {setError} from './errors'
import noteService from '../services/note.service'

const noteSlice = createSlice({
  name: 'notes',
  initialState: {
    noteState: [],
    basketState: [],
    favoritesState: [],
    error: null,
    loading: true,
    dataLoaded: false
  },
  reducers: {
    getNotesStart(state) {
      state.loading = true
    },
    getNotesSuccess(state, action) {
      state.noteState = action.payload
      state.dataLoaded = true
      state.loading = false
    },
    getNotesFail(state, action) {
      state.error = action.payload
      state.loading = false
    },
    newNotes(state, action) {
      state.noteState.push(action.payload[0])
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
  getNotesStart,
  getNotesSuccess,
  getNotesFail,
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

export function loadNotes() {
  return async dispatch => {
    dispatch(getNotesStart())
    try {
      const {content} = await noteService.get()
      dispatch(getNotesSuccess(content))

    } catch (error) {
      dispatch(getNotesFail(error.message))
      dispatch(setError(error.message))
    }
  }
}

const noteCreated = createAction('notes/noteCreated')
const noteDeleted = createAction('notes/deleteNote')

export function createNote(note) {
  return async dispatch => {
    dispatch(noteCreated(note))
    try {
      const {content} = await noteService.create(note)
      dispatch(newNotes(content))

    } catch (error) {
      dispatch(getNotesFail(error.message))
      dispatch(setError(error.message))
    }
  }
}

export function change(data) {
  return async dispatch => {
    try {
      const {content} = await noteService.update(data)
      dispatch(edit(content))

    } catch (error) {
      dispatch(getNotesFail(error.message))
      dispatch(setError(error.message))
    }
  }
}

export function noteDelete(id) {
  return async dispatch => {
    dispatch(noteDeleted())
    try {
      const {content} = await noteService.remove({id})
      if (content) {
        dispatch(remove(id))
      }

    } catch (error) {
      dispatch(getNotesFail(error.message))
      dispatch(setError(error.message))
    }
  }
}


export const getNotes = () => state => state.notesReducer.noteState
export const getBasketNotes = () => state => state.notesReducer.basketState
export const getFavoritesNotes = () => state => state.notesReducer.favoritesState
export const getLoading = () => state => state.notesReducer.loading
export const getError = () => state => state.notesReducer.error
export const getDataStatus = () => state => state.notesReducer.dataLoaded
// export const change = data => edit(data)
// export const noteDelete = id => remove(id)
export const noteDeleteAll = () => removeAll()
export const noteReturn = id => restore(id)
export const addFavorites = id => favorites(id)
export const favoritesOff = id => cancelFavorites(id)
export const removeFavorites = id => deleteFavorites(id)
export const toggleFavorites = id => toggle(id)
export const changeFavoritesNote = id => editFavorites(id)
export default reducer