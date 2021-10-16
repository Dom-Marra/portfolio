//React Imports
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Style Imports
import '../sass/styles.scss';

//Page Imports
import HomePage from "../pages/HomePage";
import Navbar from "../components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Switch>
          <Route path="/" exact><HomePage /></Route>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
