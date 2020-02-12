export default function syncActionCreator (type, ...argNames) {
  if (typeof type === 'undefined' || type.length === 0) {
    throw new Error('A type is needed for each action.')
  }

  return (...args) => {
    const action = { type }
    argNames.forEach((_, index) => {
      if (args[index]) {
        action[argNames[index]] = args[index]
      }
    })
    return action
  }
}
