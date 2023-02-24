export const thunk = () => next => action => {
  if (action === undefined) {
  } else return next(action)
}
