import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './App.css';

import { Route, Switch } from 'react-router-dom';


import Login from '../src/Components/LoginComp';
import Main from './Components/MainComp';
import Welcome from './Components/WelcomeComp';
import Movies from './Components/movies/MoviesComp';
import MembersSubscriptions from './Components/subscriptions/MembersSubscriptionsComp';
import EditMember from './Components/subscriptions/EditMemberComp';
import AddMember from './Components/subscriptions/AddMemberComp';
import Header from './Components/HeaderComp';
import Users from './Components/users/UsersComp';
import AddUser from './Components/users/AddUserComp';
import EditUser from './Components/users/EditUserComp';
import createAccount from './Components/users/CreateAccountComp';
import AddMovie from './Components/movies/AddMovieComp';
import EditMovie from './Components/movies/EditMovieComp';


import permissions from './Components/customField/PermossionComp';
import permissions1 from './Components/customField/PermossionComp1';
import usersUtil from './Utils/usersUtil';
import movieUtil from '../src/Utils/movieUtil';
import memberUtil from './Utils/membersUtil';
import subscriptionsUtil from './Utils/subscriptionsUtil';

function App() {

  const users = useSelector(state => state.users);
  const movies = useSelector(state => state.movies);
  const members = useSelector(state => state.members);
 const membersSubscriptions = useSelector(state => state.membersSubscriptions);
  const subscriptions = useSelector(state => state.subscriptions);
  const moviesSubscribers = useSelector(state => state.moviesSubscribers)

  const dispatch = useDispatch();
  const userFullName = useSelector(state => state.userFullName);
    
  useEffect(() => {
    // Using an IIFE
    (async function loadData() {
      if(users.length === 0){
        let respUser = await usersUtil.getUsers();

        if(respUser != null){
          dispatch({
            type: "LoadUsers",
            payload: respUser
          })
        }
      }

      if(movies.length === 0){
          let resp = await movieUtil.loadMovies();
          let movies = resp.movies;
         // let movie3 = movies.slice(0,2)

          dispatch({
            type : "LoadMovies",
            payload : movies
          })
        }

        if(members.length === 0){
          let resp = await memberUtil.loadMembers();
          let members = resp.members;
          
          dispatch({
            type : "LoadMembers",
            payload : members
          })
        }

        //LoadMembersSubscriptions
        if(membersSubscriptions.length === 0){
          let membersSubscriptions = await subscriptionsUtil.getFullMembersSubscriptions();

          dispatch({
            type : "LoadMembersSubscriptions",
            payload : membersSubscriptions
          })
        }

        //LoadmoviesSubscribers
        if(moviesSubscribers.length === 0){
          let moviesSubscribers = await subscriptionsUtil.getFullMoviesSubscriptions();

          dispatch({
            type : "LoadmoviesSubscribers",
            payload : moviesSubscribers
          })
        }
        

        if(subscriptions.length === 0){
          let resp = await subscriptionsUtil.getSubscriptions();
          let subscriptions = resp.subscriptions;
          
          dispatch({
            type : "LoadSubscriptions",
            payload : subscriptions
          })
        }
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
        <Route path="/movies/:id" component={Movies}/>
        <Route path="/movies/" component={Movies}/>
        <Route path="/addMovie" component={AddMovie}/>
        <Route path="/movie/:id" component={EditMovie}/>
        <Route path="/subscriptions" component={MembersSubscriptions}/>
        <Route path="/subscription/:id" component={EditMember}/>
        <Route path="/addMember" component={AddMember}/>
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
