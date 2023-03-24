import React from 'react';
import ReactDOM from 'react-dom/client';
import IndexRouter from "./router";
import './reset.less';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <IndexRouter />
  </React.StrictMode>
);
