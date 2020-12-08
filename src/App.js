import React from 'react';
import {Route, Switch} from 'react-router-dom'

//Components 
import Home from './pages/Home'
import About from './pages/About'

function App(){
  return(
    <div>
      <Switch>
          <Route path='/' component={Home} exact></Route>
          <Route path='/about' component={About}></Route>
      </Switch>
    </div>
  )

}
export default App;
