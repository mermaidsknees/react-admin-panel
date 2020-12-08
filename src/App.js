import React from 'react';
import {Route, Switch} from 'react-router-dom'

//Components 
import Home from './pages/Home'
import About from './pages/About'
import Page404 from './pages/Page404'

function App(){
  return(
    <div>
      <Switch>
          <Route path='/' component={Home} exact></Route>
          <Route path='/about' component={About}></Route>
          <Route path='*' component={Page404}></Route>
      </Switch>
    </div>
  )

}
export default App;
