import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../src/Redux/reducer';

import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';


import { BrowserRouter} from 'react-router-dom';

const persistConfig = {
  key: 'root',
  storage, // which reducer want to store
  
};
const pReducer = persistReducer(persistConfig, reducer);

const appStore = createStore(pReducer);
const persistor = persistStore(appStore);

ReactDOM.render(
  <Provider store={ appStore }>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter >
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
