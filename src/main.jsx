import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {Provider} from "react-redux";
import store from './store'
const root = document.getElementById('root');
const reactDOMRoot = ReactDOM.createRoot(root);

reactDOMRoot.render(
  <React.StrictMode>
      <Provider store={store}>
          <App />
      </Provider>
  </React.StrictMode>,
)
