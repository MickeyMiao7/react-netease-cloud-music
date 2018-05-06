import { applyMiddleware, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import reducer from '../reducers/reducer'

const logger = createLogger({
  collapsed: true
}
)

const store = createStore(
  reducer, 
  applyMiddleware(thunkMiddleware, logger)
)

export default store