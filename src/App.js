import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import EnterDetails from './EnterDetails';
import Home from './Home';
import Navbar from './Navbar';
import Quiz from './Quiz';
import Result from './Result';

function App() {

  return (
    <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/details">
            <EnterDetails />
          </Route>
          <Route path="/details/quiz">
            <Quiz />
          </Route>
          <Route path="/result">
            <Result />
          </Route>
        </Switch> 
    </Router>
  );
}

export default App;