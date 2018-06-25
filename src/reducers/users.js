import { USERS_SET, CURRENT_USER_SET } from '../store/users/actions'

const INITIAL_STATE = {
  all: {},
  currentUser: null,
}

const applySetUsers = (state, action) => ({
  ...state,
  all: action.users,
})

const applySetCurrentUser = (state, action) => ({
  ...state,
  currentUser: action.user,
})

function users(state = INITIAL_STATE, action) {
  switch (action.type) {
    case USERS_SET: {
      return applySetUsers(state, action)
    }
    case CURRENT_USER_SET: {
      return applySetCurrentUser(state, action)
    }
    default:
      return state
  }
}

export default users
