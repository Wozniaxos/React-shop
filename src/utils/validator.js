import * as yup from 'yup'

const _fields = {
  name: yup
    .string()
    .required()
    .min(3),
  email: yup
    .string()
    .required()
    .email(),
  password: yup
    .string()
    .required()
    .min(8),
  number: yup.number().required(),
}

const _buildSchema = field => {
  return yup.object().shape({
    [field]: _fields[field],
  })
}

const _validateSingleField = (field, param) => {
  const schema = _buildSchema(field)
  return schema.isValidSync({
    [field]: param,
  })
}

export const validatePasswordCompatibility = (passwordOne, passwordTwo) => {
  return passwordOne === passwordTwo
}

export const validateFields = fieldsObject => {
  const keys = Object.keys(fieldsObject)
  const validated = keys.map(key => {
    return _validateSingleField(key, fieldsObject[key])
  })
  return !validated.includes(false)
}
