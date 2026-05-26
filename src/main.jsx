import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css' 
// Redux Providers import kiye
import { Provider } from 'react-redux'
import { store } from './redux/store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Poori app ko Redux se wrap kar diya */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)