import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import routes from './router'
import { HashRouter,Routes,Route } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>{
        routes.map(route => <Route key={route.path} path={route.path} element={<route.component />}></Route>)
      }</Routes>
    </HashRouter>
  </React.StrictMode>,
)
