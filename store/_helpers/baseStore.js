import baseState from './ baseState'
import baseGetters from './baseGetters'
import baseActions from './baseActions'
import baseMutations from './baseMutations'
import baseService from './baseService'

export default function baseStore (endpoint) {
  const service = baseService(endpoint)
  return {
    namespaced: true,
    // Clone the base state as it would otherwise
    // be the same shared object for all store modules
    // importing the base store.
    state: JSON.parse(JSON.stringify(baseState)),
    mutations: baseMutations,
    getters: baseGetters,
    actions: baseActions(service)
  }
}
