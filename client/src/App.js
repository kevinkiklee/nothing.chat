import React from 'react'
import ReactDOM from 'react-dom'

import './reset.css'
import './app.css'
import Chat from './components/Chat'
import Store from './store/Store'

const chatId = window.location.pathname.split('/c/')[1]

const app = async () => {
  try {
    const response = await fetch(`/api/connect/${chatId}`)

    if (!response.ok) {
      throw Error(response.statusText)
    }

    const { clientId } = await response.json()

    if (clientId) {
      const store = new Store({ chatId, clientId })

      ReactDOM.render(<Chat store={store} />, document.getElementById('root'))
    }
  } catch (error) {
    document.querySelector('#root').innerHTML = 'chatroom does not exist'
  }
}

app()
