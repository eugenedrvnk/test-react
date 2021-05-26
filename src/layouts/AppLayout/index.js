import './index.scss'
import {AppLayoutHeader} from './Header';

const AppLayout = ({children}) => {
  return (

    <div className="app-layout">
      <AppLayoutHeader/>
      <div className="app-layout__container">
        {children}
      </div>
    </div>
  )
}

export {
  AppLayout
}
