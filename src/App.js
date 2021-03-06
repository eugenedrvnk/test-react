import './App.css';
import {AuthProvider} from './contexts/AuthContext';
import {AppRoutes} from './routes/AppRoutes';
import {BrowserRouter} from 'react-router-dom'
import {StylesProvider} from '@material-ui/core/styles';

function App() {
  return (
    <BrowserRouter>
      <StylesProvider injectFirst>
        <AuthProvider>
          <AppRoutes/>
        </AuthProvider>
      </StylesProvider>
    </BrowserRouter>
  );
}

export default App;
