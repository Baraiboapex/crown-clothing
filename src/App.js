import React from 'react';

import {Switch, Route, Redirect} from 'react-router-dom';
import './App.css';

import Header from "./components/header/header.component";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import CheckoutPage from './pages/checkout/checkout.component';

import { 
  auth, 
  createUserProfileDocument
  //addCollectionAndDocuments
} from './firebase/firebase.utils';

import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
import { selectCollectionItems } from './redux/shop/shop.selector';

import { createStructuredSelector } from 'reselect';

import { connect } from 'react-redux';


class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount(){
 
    const { setCurrentUser/*, collectionArray*/ } = this.props;

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
      //addCollectionAndDocuments('collections',collectionArray);
      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth()
  }
  
  render(){
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route path='/shop' component={ShopPage}/>
          <Route exact path='/checkout' component={CheckoutPage}/>
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

const mapPropsToState = createStructuredSelector({
  currentUser: selectCurrentUser,
  collectionArray: selectCollectionItems
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapPropsToState, mapDispatchToProps)(App);
