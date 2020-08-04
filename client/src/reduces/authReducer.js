import loginService from '../services/login'
import postService from '../services/posts'

const authReducer = (state = null, action) => {
  switch (action.type) {
    case 'INIT_AUTH':
      return action.data
    case 'LOGIN':
      return action.data
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

export const initAuth = () => {
  return async (dispatch) => {
    const isUserLogged = window.localStorage.getItem('loggedForumUserApp')

    if (isUserLogged) {
      const user = JSON.parse(isUserLogged)
      await postService.setToken(user.token)

      dispatch({
        type: 'INIT_AUTH',
        data: user,
      })
    } else {
      logout()
    }
  }
}

export const login = ({ username, password }) => {
  return async (dispatch) => {
    const user = await loginService.login({
      username,
      password,
    })

    window.localStorage.setItem('loggedForumUserApp', JSON.stringify(user))
    await postService.setToken(user.token)

    dispatch({
      type: 'LOGIN',
      data: user,
    })
  }
}

export const logout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedForumUserApp')
    dispatch({
      type: 'LOGOUT',
    })
  }
}

export default authReducer
