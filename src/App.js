import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import EnterDetails from './EnterDetails';
import Home from './Home';
import Navbar from './Navbar';
import Quiz from './Quiz';
import Result from './Result';

function App() {
  
  const [details, setDetails] = useState(null);

  return (
    <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/details">
            <EnterDetails details={details} setDetails={setDetails} />
          </Route>
          <Route path="/details/quiz">
            <Quiz details={details} setDetails={setDetails} />
          </Route>
          <Route path="/result">
            <Result />
          </Route>
        </Switch> 
    </Router>
  );
}

export default App;