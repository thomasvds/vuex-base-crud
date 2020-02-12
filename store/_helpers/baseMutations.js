import Vue from 'vue'
import { SET_ALL, GET_ALL, GET_ONE, DELETE, UPDATE, CREATE, UPDATE_CURRENT } from './baseConstants'

const replaceInList = (list, data) => {
  // When updating an element in the list, find it by its id, then
  // replace the old element with the new one at this index. Note
  // that we need to use Vue.set() to account for Vue's shortcomings
  // on reactivity towards objects in arrays.
  const index = list.data.findIndex(d => d.id === data.id)
  Vue.set(list.data, index, data)
}

export default {
  [SET_ALL] ({ list }, { payload }) {
    list.loading = false
    list.data = payload.data
  },
  [`${GET_ONE}_REQUEST`] ({ current }) {
    current.success = false
    current.loading = true
    current.message = ''
    current.error = null
  },
  [`${GET_ALL}_REQUEST`] ({ list }) {
    list.success = false
    list.loading = true
    list.message = ''
    list.error = null
  },
  [`${CREATE}_REQUEST`] ({ list }) {
    list.actions.create.success = false
    list.actions.create.loading = true
    list.actions.create.message = ''
    list.actions.create.error = null
  },
  [`${UPDATE}_REQUEST`] ({ list }) {
    list.actions.update.success = false
    list.actions.update.loading = true
    list.actions.update.message = ''
    list.actions.update.error = null
  },
  [`${UPDATE_CURRENT}_REQUEST`] ({ current }) {
    current.actions.update.success = false
    current.actions.update.loading = true
    current.actions.update.message = ''
    current.actions.update.error = null
  },
  [`${DELETE}_REQUEST`] ({ list }) {
    list.actions.delete.success = false
    list.actions.delete.loading = true
    list.actions.delete.message = ''
    list.actions.delete.error = null
  },
  [`${GET_ONE}_SUCCESS`] ({ current }, { payload }) {
    current.loading = false
    current.message = payload.message
    current.data = payload.data
  },
  [`${GET_ALL}_SUCCESS`] ({ list }, { payload }) {
    list.loading = false
    list.message = payload.message
    list.data = payload.data
  },
  [`${CREATE}_SUCCESS`] ({ list }, { payload }) {
    list.actions.create.loading = false
    list.actions.create.message = payload.message
    // When adding to the list, append the new object at the end
    list.data.push(payload.data)
  },
  [`${UPDATE}_SUCCESS`] ({ list }, { payload }) {
    list.actions.update.loading = false
    list.actions.update.message = payload.message
    replaceInList(list, payload.data)
  },
  [`${UPDATE_CURRENT}_SUCCESS`] ({ current }, { payload }) {
    current.actions.update.loading = false
    current.actions.update.message = payload.message
    current.data = payload.data
  },
  [`${DELETE}_SUCCESS`] ({ list }, { payload }) {
    list.actions.delete.loading = false
    list.actions.delete.message = payload.message
    const idx = list.data.findIndex(d => d.id === payload.data.id)
    list.data.splice(idx, 1)
  },
  [`${GET_ONE}_FAILED`] ({ current }, { payload }) {
    current.success = false
    current.loading = false
    current.error = payload.error
    current.message = payload.message
    console.error(`Error: ${payload.error}`)
  },
  [`${GET_ALL}_FAILED`] ({ list }, { payload }) {
    list.success = false
    list.loading = false
    list.error = payload.error
    list.message = payload.message
    console.error(`Error: ${payload.error}`)
  },
  [`${CREATE}_FAILED`] ({ list }, { payload }) {
    list.actions.create.success = false
    list.actions.create.loading = false
    list.actions.create.error = payload.error
    list.actions.create.message = payload.message
    console.error(`Error: ${payload.error}`)
  },
  [`${UPDATE}_FAILED`] ({ list }, { payload }) {
    list.actions.update.success = false
    list.actions.update.loading = false
    list.actions.update.error = payload.error
    list.actions.update.message = payload.message
    console.error(`Error: ${payload.error}`)
  },
  [`${UPDATE_CURRENT}_FAILED`] ({ current }, { payload }) {
    current.actions.update.success = false
    current.actions.update.loading = false
    current.actions.update.error = payload.error
    current.actions.update.message = payload.message
    console.error(`Error: ${payload.error}`)
  },
  [`${DELETE}_FAILED`] ({ list }, { payload }) {
    list.actions.delete.success = false
    list.actions.delete.loading = false
    list.actions.delete.error = payload.error
    list.actions.delete.message = payload.message
    console.error(`Error: ${payload.error}`)
  }
}
