import {Switch, Route, Redirect} from 'react-router-dom';
import {useAuth} from '../contexts/AuthContext';

import {Signin} from '../views/auth/Signin';
import {Signup} from '../views/auth/Signup';

import {Profile} from '../views/private/Profile';
import {AddPost} from '../views/private/AddPost';

import {Posts} from '../views/public/Posts';

import {AuthLayout} from '../layouts/AuthLayout';
import {AppLayout} from '../layouts/AppLayout';

const AppRoutes = () => {
  const {isLoggedIn} = useAuth()

  return (
    <AppLayout>
      <Switch>
        {
          isLoggedIn
            ?
            <>
              <Route path="/" exact component={Profile}/>
              <Route path="/add-post" exact component={AddPost}/>
              <Route path="/posts" exact component={Posts}/>
            </>
            :
            <AuthLayout>
              <Route path="/signin" exact component={Signin}/>
              <Route path="/signup" exact component={Signup}/>
              <Redirect from="/profile" to="/signin"/>
            </AuthLayout>
        }
      </Switch>
    </AppLayout>
  )
}

export {
  AppRoutes
}
