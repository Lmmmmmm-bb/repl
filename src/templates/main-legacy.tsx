import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

// template for react v17
// @ts-expect-error v19 type not compatible
// eslint-disable-next-line react/no-deprecated
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

window.postMessage({ type: 'REACT_MOUNT' });
