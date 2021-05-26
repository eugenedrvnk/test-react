import {createContext, useState, useContext, useEffect} from 'react';
import {api} from '../../api';
import firebase from 'firebase';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(null)

  const isLoggedIn = !!currentUser

  const signup = ({email, password}) => {
    return api.auth.signup({email, password})
      .then(user => setCurrentUser(user))
  }

  const signin = async ({email, password}) => {
    return api.auth.signin({email, password})
      .then(user => setCurrentUser(user))
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log(user)
        setCurrentUser(user)
      } else {
        setCurrentUser(null)
      }
    });
  }, [])

  return (
    <AuthContext.Provider
      value={{
        signin,
        signup,
        signout: api.auth.signout,
        currentUser,
        isLoggedIn
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const auth = useContext(AuthContext)
  return auth
}

export {
  AuthContext,
  AuthProvider,
  useAuth
}
