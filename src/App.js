import React from 'react';

import {Switch, Route, Redirect} from 'react-router-dom';
import './App.css';

import Header from "./components/header/header.component";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";

import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { connect } from 'react-redux';



class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount(){

    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      }
      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth()
  }
  /* FOR LATER!!!!
    
          <Route exact path='/hats'/ component={HatsPage}>
          <Route exact path='/jackets' component={JacketsPage}/>
          <Route exact path='/sneakers' component={SneakersPage}/>
          <Route exact path='/womens' component={WomensPage}/>
          <Route exact path='/mens' component={MensPage}/>
  */
  render(){
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route exact path='/shop' component={ShopPage}/>
          <Route exact path='/signin' render={
            ()=>this.props.currentUser ? (
              <Redirect to='/'/>
            ):(
              <SignInAndSignUpPage/>
            )}
            />
        </Switch>
      </div>
    );
  }
}

const mapPropsToState = ({user}) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapPropsToState, mapDispatchToProps)(App);
