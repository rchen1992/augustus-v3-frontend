import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import history from 'routerHistory';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { useAuth0 } from 'providers/Auth0Provider';
import LandingPage from 'pages/LandingPage';
import Home from 'pages/Home';
import Ladder from 'pages/Ladder';
import PrivateRoute from './PrivateRoute';
import FullscreenSpin from 'components/FullscreenSpin';
import NotFoundRoute from 'components/NotFoundRoute';

function Test() {
    return <div>hello world</div>;
}

const App: React.FC = () => {
    const { loading, isAuthenticated, getTokenSilently, user } = useAuth0();
    const clientRef = React.useRef<ApolloClient<unknown> | null>(null);

    /**
     * If user is authed, we need to set Authorization token
     * from Auth0 on every request to authenticate the user on the backend.
     *
     * If user isn't authed (which is possible in our app because we have public pages),
     * we won't send any token at all.
     *
     * Here we reconstruct ApolloClient in a `useEffect` whenever auth status changes.
     */
    React.useEffect(() => {
        clientRef.current = new ApolloClient({
            uri: process.env.REACT_APP_GRAPHQL_API_ENDPOINT,
            credentials: 'include',
            request:
                user && getTokenSilently
                    ? async operation => {
                          const token = await getTokenSilently();

                          operation.setContext((context: Record<string, any>) => ({
                              headers: {
                                  ...context.headers,
                                  Authorization: `Bearer ${token}`,
                                  userData: JSON.stringify({
                                      nickname: user.nickname,
                                      email: user.email,
                                      avatar_url: user.picture,
                                  }),
                              },
                          }));
                      }
                    : undefined,
        });
    }, [getTokenSilently, user]);

    if (loading) {
        return <FullscreenSpin />;
    }

    const router = (
        <Router history={history}>
            <Switch>
                <PrivateRoute path="/private" component={Test} />
                <Route path="/ladders/:ladderId" component={Ladder} />
                <Route path="/" exact component={isAuthenticated ? Home : LandingPage} />
                <Route path="*">
                    <NotFoundRoute />
                </Route>
            </Switch>
        </Router>
    );

    return clientRef.current ? (
        <ApolloProvider client={clientRef.current}>{router}</ApolloProvider>
    ) : (
        router
    );
};

export default App;
