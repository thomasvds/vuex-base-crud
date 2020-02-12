export default {
  getById: state => id => state.list.data.find(m => m.id === id)
}
