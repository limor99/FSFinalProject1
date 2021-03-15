import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reduser from '../src/Redux/reducer';

import { BrowserRouter} from 'react-router-dom';

function saveToSessionStorage(state){
  try{
      const serializedState = JSON.stringify(state);
      sessionStorage.setItem('state', serializedState);
  }
  catch(e){
      console.log(`An error occured while try to save store in sessionStorage ${e}`);
  }
}

function loadFromSessionStorage(){
  try{
      const serializedState = sessionStorage.getItem('state');
      if(serializedState === null){
        return undefined;
      }
      return JSON.parse(serializedState);
  }
  catch(e){
    console.log(`An error occured while try to load the store from sessionStorage ${e}`);
    return undefined;
  }
}

const persistedState = loadFromSessionStorage();

/*const appStore = createStore(reduser, persistedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());*/
const appStore = createStore(reduser);

appStore.subscribe(() => saveToSessionStorage(appStore.getState()));

ReactDOM.render(
  <Provider store={ appStore }>
  <BrowserRouter >
    
      <App />
    
  </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
