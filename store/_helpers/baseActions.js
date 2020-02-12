import promiseActionCreator from './promiseActionCreator'
import { GET_ALL, GET_ONE, DELETE, UPDATE, CREATE, UPDATE_CURRENT } from './baseConstants'

export default function baseActionsCreator (service) {
  return {
    create (store, data) {
      return promiseActionCreator(store, service.create(data), CREATE)
    },
    fetchOne (store, id, params) {
      return promiseActionCreator(store, service.show(id, params), GET_ONE)
    },
    fetchAll (store, params) {
      return promiseActionCreator(store, service.index(params), GET_ALL)
    },
    update (store, id, data) {
      return promiseActionCreator(store, service.update(id, data), UPDATE)
    },
    updateCurrent (store, data) {
      return promiseActionCreator(store, service.update(store.state.current.data.id, data), UPDATE_CURRENT)
    },
    destroy (store, id) {
      return promiseActionCreator(store, service.delete(id), DELETE)
    }
  }
}
