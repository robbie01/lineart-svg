// @flow

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

const root = document.getElementById('root')
if (root == null) {
    console.error('root element is null')
} else {
    ReactDOM.render(<App />, root)
    registerServiceWorker()
}
