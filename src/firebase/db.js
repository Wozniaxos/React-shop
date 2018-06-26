import { db } from './firebase'

export const create = (entity, params) => {
  const entityPath = `${entity}s`.toLowerCase()
  const { id } = params
  if (!id) {
    const createdId = initializeKey(entity)
    params['id'] = createdId
    return db.ref(`${entityPath}/${createdId}`).set(params)
  } else {
    return db.ref(`${entityPath}/${id}`).set(params)
  }
}

export const update = (entity, params) => {
  const { id } = params
  const entityPath = `${entity}s`.toLowerCase()
  return db.ref(`${entityPath}/${id}`).update(params)
}

export const destroy = (entity, params) => {
  const { id } = params
  const entityPath = `${entity}s`.toLowerCase()
  return db.ref(`${entityPath}/${id}`).set(null)
}

export const fetchAndHandleChangesFor = (entity, handler) =>
  db.ref(`${entity}s`.toLowerCase()).on('value', handler)

export const initializeKey = entity => db.ref(`${entity}s`.toLowerCase()).push().key

export const handleInitialLoadFor = entity => db.ref(`${entity}s`.toLowerCase()).once('value')
