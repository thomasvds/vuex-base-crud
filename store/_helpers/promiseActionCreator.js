import syncActionCreator from './syncActionCreator'

const formatError = (e) => `[${e.status}] ${e.title} - ${e.detail}`

export default async function promiseActionCreator ({ commit }, baseAction, baseMutationName, fieldName) {
  // 1. Create helper actions surrounding the main action, to sequence the request-response cycle
  // Yes, we know that using payload as a key name introduces a phenomenon
  // where we have to query payload.payload downstream, but we stick to it
  // for the lack of a better naming.
  const requestAction = syncActionCreator(`${baseMutationName}_REQUEST`, 'payload')
  const successAction = syncActionCreator(`${baseMutationName}_SUCCESS`, 'payload')
  const failedAction = syncActionCreator(`${baseMutationName}_FAILED`, 'payload')

  // 2. Setup the state to indicate we're starting a request
  fieldName ? commit(requestAction({ field: fieldName })) : commit(requestAction())

  try {
    // 3. Fire the actual request
    const response = await baseAction
    if (response.errors) {
      const errorMessage = response.errors.map(e => formatError(e)).join(', ')
      // 3.A. If request failed, save error data in the state
      commit(failedAction({ error: errorMessage }))
    } else {
      // 3.A. If request succeeded, save response data in the state
      commit(successAction(response))
      // Ensure the top-level calling object can read the response from the API
      // if it needs to act on it.
      return response
    }
  } catch (error) {
    // 4. If anything fails, save error data in the state
    commit(failedAction({ error: error.message }))
  }
}
