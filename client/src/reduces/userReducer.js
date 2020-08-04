import userService from '../services/users'

const userReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_USER':
      return action.data
    case 'CREATE_USER':
      return state.concat(action.data)
    default:
      return state
  }
}

export const createUser = (newUser) => {
  return async (dispatch) => {
    const userCreated = await userService.create(newUser)

    dispatch({
      type: 'CREATE_USER',
      data: userCreated,
    })
  }
}

export default userReducer
