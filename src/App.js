import {useEffect, useState} from 'react';
import CurrentUserContext from './contexts/current-user/current-user.context';
import {Route, Switch, Redirect} from 'react-router-dom';
import Homepage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import CheckoutPage from './pages/checkout/checkout.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  
  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged( async (userAuth) => {

      if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

      userRef.onSnapshot(snapshot => {
         setCurrentUser({id: snapshot.id, ...snapshot.data()});
      })
      
      } else {
        setCurrentUser(userAuth);
      }
     
    })

    return () => {
      unsubscribeFromAuth();
    }
    
  }, [])
  return (
  <div>
    <CurrentUserContext.Provider value={currentUser}>
      <Header />
    </CurrentUserContext.Provider>
    <Switch>
        <Route exact path='/' component={Homepage} />
        <Route path='/shop' component={ShopPage} />
        <Route exact path='/checkout' component={CheckoutPage} />
        <Route exact path='/signin' render={() => currentUser ? <Redirect to='/' /> : <SignInAndSignUpPage />} />
    </Switch>
  </div>
  );
}

export default App;
