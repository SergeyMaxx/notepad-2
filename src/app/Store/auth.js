// import localStorageService from '../services/localStorage.service'
// import {createAction, createSlice} from '@reduxjs/toolkit'
// import authService from '../services/auth.service'
// import history from '../utils/history'
// import {generateAuthError} from '../utils/generateAuthError'
// import userService from '../services/user.service'
//
// const initialState = localStorageService.getAccessToken()
//   ? {
//     entities: null,
//     isLoading: true,
//     error: null,
//     auth: {userId: localStorageService.getUserId()},
//     isLoggedIn: true,
//     dataLoaded: false
//   }
//   : {
//     entities: null,
//     isLoading: false,
//     error: null,
//     auth: null,
//     isLoggedIn: false,
//     dataLoaded: false
//   }
//
// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     usersRequested(state) {
//       state.isLoading = true
//     },
//     usersReceived(state, action) {
//       state.entities = action.payload
//       state.dataLoaded = true
//       state.isLoading = false
//     },
//     usersRequestFailed(state, action) {
//       state.error = action.payload
//       state.isLoading = false
//     },
//     authRequestSuccess(state, action) {
//       state.auth = action.payload
//       state.isLoggedIn = true
//     },
//     authRequestFailed(state, action) {
//       state.error = action.payload
//     },
//     userCreated(state, action) {
//       if (!Array.isArray(state.entities)) {
//         state.entities = []
//       }
//       state.entities.push(action.payload)
//     },
//     userLoggedOut(state) {
//       state.entities = null
//       state.isLoggedIn = false
//       state.auth = null
//       state.dataLoaded = false
//     },
//     userUpdateSuccessfully(state, action) {
//       state.entities[state.entities.findIndex(u => u.id === action.payload.id)] = action.payload
//     },
//     authRequested(state) {
//       state.error = null
//     }
//   }
// })
//
// const {reducer: authReducer} = authSlice
// const {
//   usersRequested,
//   usersReceived,
//   usersRequestFailed,
//   authRequestSuccess,
//   authRequestFailed,
//   userCreated,
//   userLoggedOut,
//   userUpdateSuccessfully
// } = authSlice.actions
//
// const authRequested = createAction('auth/authRequested')
// const userCreateRequested = createAction('auth/userCreateRequested')
// const createUserFailed = createAction('auth/createUserFailed')
// const userUpdateRequested = createAction('auth/userUpdateRequested')
// const userUpdateFailed = createAction('auth/userUpdateFailed')
//
// export const login = ({payload}) => {
//   return async dispatch => {
//     const {email, password} = payload
//     dispatch(authRequested())
//     try {
//       const data = await authService.login({email, password})
//       dispatch(authRequestSuccess({userId: data.localId}))
//       localStorageService.setTokens(data)
//       history.push('/notes')
//
//     } catch (error) {
//       const {code, message} = error.response.data.error
//
//       if (code === 400) {
//         const errorMessage = generateAuthError(message)
//         dispatch(authRequestFailed(errorMessage))
//       } else {
//         dispatch(authRequestFailed(error.message))
//       }
//     }
//   }
// }
//
// export const signUp = payload => {
//   return async dispatch => {
//     dispatch(authRequested())
//     try {
//       const data = await authService.register(payload)
//       localStorageService.setTokens(data)
//       dispatch(authRequestSuccess({userId: data.localId}))
//       history.push('/notes')
//       // dispatch(createUser({
//       //     id: data.localId,
//       //     email,
//       //     image: `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
//       //       .toString(36)
//       //       .substring(7)}.svg`,
//       //     ...rest
//       //   })
//       // )
//
//     } catch (error) {
//       dispatch(authRequestFailed(error.message))
//     }
//   }
// }
//
// export const logOut = () => {
//   return dispatch => {
//     localStorageService.removeAuthData()
//     dispatch(userLoggedOut())
//     history.push('/')
//   }
// }
//
// // function createUser(payload) {
// //   return async function (dispatch) {
// //     dispatch(userCreateRequested())
// //     try {
// //       const {content} = await userService.create(payload)
// //       dispatch(userCreated(content))
// //       history.push('/notes')
// //
// //     } catch (error) {
// //       dispatch(createUserFailed(error.message))
// //     }
// //   }
// // }
//
// export const loadUsersList = () => {
//   return async dispatch => {
//     dispatch(usersRequested())
//     try {
//       const {content} = await userService.get()
//       dispatch(usersReceived(content))
//
//     } catch (error) {
//       dispatch(usersRequestFailed(error.message))
//     }
//   }
// }
// export const updateUser = payload => {
//   return async dispatch => {
//     dispatch(userUpdateRequested())
//     try {
//       const {content} = await userService.update(payload)
//       dispatch(userUpdateSuccessfully(content))
//       history.push(`/notes/${content.id}`)
//
//     } catch (error) {
//       dispatch(userUpdateFailed(error.message))
//     }
//   }
// }
//
// export const getUsersList = () => state => state.entities
//
// export const getCurrentUserData = () => {
//   return async state => await state.entities
//     ? state.entities.find(u => u.id === state.auth.userId)
//     : null
// }
//
// export const getState = () => state => state
// export const getIsLoggedIn = () => state => state.authReducer.isLoggedIn
// export const getDataStatus = () => state => state.authReducer.dataLoaded
// export const getUsersLoadingStatus = () => state => state.authReducer.isLoading
// export const getCurrentUserId = () => state => state.authReducer.auth.userId
// export const getAuthErrors = () => state => state.authReducer.error
// export default authReducer