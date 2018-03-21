import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import App from './container/app'


const rootElement = document.getElementById('root')
render(
  <AppContainer>
    <App />
  </AppContainer>,
  rootElement
)