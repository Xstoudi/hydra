import transform from 'lodash/transform'
import isArray from 'lodash/isArray'
import isObject from 'lodash/isObject'
import camelCase from 'lodash/camelCase'

function camelize(obj: any) {
  return transform(obj, (acc: any, value, key, target) => {
    if (typeof key === 'symbol') throw new Error('invalid key: symbol')

    const camelKey = isArray(target) ? key : camelCase(key as string)
    acc[camelKey] = isObject(value) ? camelize(value) : value
  })
}

export default camelize
