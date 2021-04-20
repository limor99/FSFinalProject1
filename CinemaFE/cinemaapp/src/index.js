import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../src/Redux/reducer';

import { createMigrate, persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel1 from 'redux-persist/es/stateReconciler/autoMergeLevel1';

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import hardSet from 'redux-persist/es/stateReconciler/hardSet';

import { BrowserRouter} from 'react-router-dom';



const migration = {
  0: (state) =>{
    return {
      ...state, 
      device: undefined
    }
  },
  1: (state) =>{
    return {
      device: state.device
    }
  }
}

const persistConfig = {
  key: 'root',
  storage, // which reducer want to store
  version: 1,
  stateReconciler: autoMergeLevel1, 
  migrate: createMigrate(migration, {debug: false}),
  /*(state) =>{
    console.log('************************************************************');
    return Promise.resolve(state);
  }*/
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
