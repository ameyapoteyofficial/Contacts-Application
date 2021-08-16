
import './App.css';
import SearchContacts from './components/SearchContacts';


//components

import ListContacts from './components/ListContacts';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
          <div>
          <div className = "container">
          
                
              
            
            <Switch>
                <Route exact path="/">
                <ListContacts></ListContacts>

                </Route>
                <Route exact path="/search">
                <SearchContacts></SearchContacts>

                </Route>
            </Switch>

              
          </div>
          
        </div>
    </Router>
  
  );
}

export default App;
