import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from 'react-router-dom';

import Home from './Home';
import About from './About';
import StoryPage from './StoryPage';
import styles from './App.module.css';

function App() {
  return (
    <Router>
      <div className={styles.app}>
        <div>
          <nav className={styles.nav}>
            <ul>
              <li>
                <NavLink to="/" exact activeClassName={styles.active}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/story" activeClassName={styles.active}>
                  Story
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" activeClassName={styles.active}>
                  About
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>

        <div className={styles.content}>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/story">
              <StoryPage />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
