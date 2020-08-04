import postService from '../services/posts'

const postReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_POSTS':
      return action.data
    case 'CREATE_POST':
      return [...state, action.data]
    case 'UPDATE_POST':
      return state.map((s) =>
        s.id.toString() === action.data.id.toString() ? action.data : s
      )
    case 'DELETE_POST':
      return state.filter((s) => s.id !== action.id)
    case 'LIKE_POST':
      return state.map((s) =>
        s.id.toString() === action.data.id.toString() ? action.data : s
      )
    case 'COMMENT_POST':
      return state.map((s) =>
        s.id.toString() === action.data.id.toString() ? action.data : s
      )
    default:
      return state
  }
}

export const initPosts = () => {
  return async (dispatch) => {
    const posts = await postService.getAll()

    dispatch({
      type: 'INIT_POSTS',
      data: posts,
    })
  }
}

export const createPost = (post) => {
  return async (dispatch) => {
    const postSaved = await postService.create(post)

    dispatch({
      type: 'CREATE_POST',
      data: postSaved,
    })
  }
}

export const updatePost = (post, id) => {
  return async (dispatch) => {
    const postUpdated = await postService.update(id, post)

    dispatch({
      type: 'UPDATE_POST',
      data: postUpdated,
    })
  }
}

export const deletePost = (id) => {
  return async (dispatch) => {
    const postDeleted = await postService.remove(id)

    dispatch({
      type: 'DELETE_POST',
      id,
    })
  }
}

export const likePost = (id) => {
  return async (dispatch) => {
    const postLiked = await postService.like(id)

    dispatch({
      type: 'LIKE_POST',
      data: postLiked,
    })
  }
}

export const commentPost = (id, comment) => {
  return async (dispatch) => {
    const postCommented = await postService.comment(id, comment)

    dispatch({
      type: 'COMMENT_POST',
      data: postCommented,
    })
  }
}

export default postReducer
