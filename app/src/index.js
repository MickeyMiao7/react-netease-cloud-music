import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
// import { BrowserRouter } from 'react-router-dom'

import store from './stores/store'
import App from './containers/app'


const rootElement = document.getElementById('root')
render(
  <AppContainer>
    <Provider store={store}>
      <App />
    </Provider>
  </AppContainer>,
  rootElement
)