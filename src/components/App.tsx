import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import history from 'routerHistory';
import LandingPage from 'pages/LandingPage';

const App: React.FC = () => {
    const router = (
        <Router history={history}>
            <Switch>
                <Route path="/" component={LandingPage} />
            </Switch>
        </Router>
    );

    return router;
};

export default App;
