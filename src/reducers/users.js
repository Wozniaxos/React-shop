const INITIAL_STATE = {
  all: {},
}

const applySetUsers = (state, action) => ({
  ...state,
  all: action.users,
})

function users(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'USERS_SET': {
      return applySetUsers(state, action)
    }
    default:
      return state
  }
}

export default users
