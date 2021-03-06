import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Quiz from './components/Quiz';
import Result from './components/Result';
import 'animate.css';

function App() {

  return (
    <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
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