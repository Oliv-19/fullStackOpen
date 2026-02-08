import ReactDOM from 'react-dom/client'
import { combineReducers, createStore } from 'redux'
import { Provider } from 'react-redux'

import App from './App'
import reducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'

const allReducer = combineReducers({
  anecdotes: reducer,
  filter: filterReducer
})
const store = createStore(allReducer)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
