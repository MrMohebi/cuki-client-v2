import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {store} from './stores/reduxStore/store'
import './index.css';
import App from './App';

ReactDOM.render(
  <React.Fragment>
      <Provider store={store}>
          <App />
      </Provider>
  </React.Fragment>,
  document.getElementById('root')
);
