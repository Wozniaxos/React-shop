export const USERS_SET = 'USERS_SET'
export const CURRENT_USER_SET = 'CURRENT_USER_SET'

export const setUsers = users => ({ type: USERS_SET, users })
export const setCurrentUser = user => ({ type: CURRENT_USER_SET, user })
