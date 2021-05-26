import {AppBar, Toolbar, Button} from '@material-ui/core';
import {useAuth} from '../../../contexts/AuthContext';
import {useHistory} from "react-router-dom";

import './index.scss'

const AppLayoutHeader = () => {
  const history = useHistory()
  const {isLoggedIn, signout} = useAuth()

  const handleAuthButtonClick = () => {
    if (isLoggedIn) signout()
    else history.push('/signin')
  }

  return (
    <AppBar position="static">
      <Toolbar className="app-layout-header__toolbar">
        {
          isLoggedIn && (
            <>
              <Button
                onClick={() => history.push('/add-post')}
                color="inherit"
              >
                Add post
              </Button>

              <Button
                onClick={() => history.push('/posts')}
                color="inherit"
              >
                Posts
              </Button>
            </>
          )
        }

        <Button
          className="app-layout-header__logout"
          onClick={handleAuthButtonClick}
          color="inherit"
        >
          {isLoggedIn ? 'Logout' : 'Login'}
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export {
  AppLayoutHeader
}
