import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './App.css';

import { Route, Switch } from 'react-router-dom';

import movieUtil from '../src/Utils/movieUtil';
import Login from '../src/Components/LoginComp';
import Main from './Components/MainComp';
import Welcome from './Components/WelcomeComp';
import Movies from './Components/movies/MoviesComp';
import Members from './Components/subscriptions/MembersComp';
import Header from './Components/HeaderComp';
import Users from './Components/users/UsersComp';
import AddUser from './Components/users/AddUserComp';
import EditUser from './Components/users/EditUserComp';
import createAccount from './Components/users/CreateAccountComp';

import permissions from './Components/customField/PermossionComp';
import permissions1 from './Components/customField/PermossionComp1';
import usersUtil from './Utils/usersUtil';

function App() {
  const users = useSelector(state => state.users);

  const dispatch = useDispatch();
    const userFullName = useSelector(state => state.userFullName);
    
    console.log('App: ')

    useEffect(() => {
      // Using an IIFE
      (async function anyNameFunction() {
        if(users.length === 0){
          let respUser = await usersUtil.getUsers();

          if(respUser != null){
            dispatch({
              type: "LoadUsers",
              payload: respUser
            })
    
          }
        }

        let resp = await movieUtil.loadMovies();
        let movies = resp.movies;
        let movie3 = movies.slice(0,2)

        dispatch({
          type : "LoadData",
          payload : movie3
        })
      })();
    }, []);

  return (
    <div className="App">
        {userFullName !== '' ? <Header userFullName={userFullName} /> : userFullName}
          
      <Switch>
        <Route exact path="/" component={Welcome}/>
        <Route path="/login" component={Login}/>
        <Route path="/createAccount" component={createAccount}/>
        <Route path="/main" component={Main}/>
        <Route path="/movies" component={Movies}/>
        <Route path="/Subscriptions" component={Members}/>
        <Route path="/users" component={Users}/>
        <Route path="/addUser" component={AddUser}/>
        <Route path="/user/:id" component={EditUser}/>

        <Route path="/nis" component={permissions}/>
        <Route path="/nis1" component={permissions1}/>
        
      </Switch>
     
    </div>
  );
}

export default App;
