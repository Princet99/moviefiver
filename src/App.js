import "./App.css";
import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { HomeGrid } from "./components/HomeGrid";
import { Movie } from "./components/Movie";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <Router>
        <Header />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/HomeGrid">
            <HomeGrid />
          </Route>

          <Route path="/movie/:id" component={Movie} />
        </Switch>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
