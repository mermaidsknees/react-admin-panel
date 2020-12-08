import React from 'react';
import {Route, Switch} from 'react-router-dom'

//Components 
import Home from './pages/Home'
import About from './pages/About'

function App(){
  return(
    <div>
      <Switch>
          <Route to='/' component={Home} exact></Route>
          <Route to='/about' component={About}></Route>
      </Switch>
    </div>
  )

}
export default App;
