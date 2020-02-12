import { API } from '@/services/api'

export default function baseService (endpoint) {
  return {
    create (payload) {
      return API.post(endpoint, payload)
    },
    index (params) {
      return API.get(endpoint, params)
    },
    show (id, params) {
      return API.get(`${endpoint}/${id}`, params)
    },
    update (id, payload) {
      return API.put(`${endpoint}/${id}`, payload)
    },
    delete (id) {
      return API.delete(`${endpoint}/${id}`)
    }
  }
}
