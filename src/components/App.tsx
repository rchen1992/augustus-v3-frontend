import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import history from 'routerHistory';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { useAuth0 } from 'providers/Auth0Provider';
import LandingPage from 'pages/LandingPage';
import Home from 'pages/Home';
import PrivateRoute from './PrivateRoute';
import FullscreenSpin from 'components/FullscreenSpin';

function Test() {
    return <div>hello world</div>;
}

const App: React.FC = () => {
    const { loading, isAuthenticated, getTokenSilently, user } = useAuth0();
    const clientRef = React.useRef<ApolloClient<unknown> | null>(null);

    /**
     * ApolloClient needs to set the Authorization token
     * from Auth0 on every request, but the token won't be available
     * until the user is actually authed.
     * This means we can't construct ApolloClient until we have an auth token,
     * so we wait until it's available during `useEffect`, and then set
     * the clientRef accordingly.
     */
    React.useEffect(() => {
        if (!user || !getTokenSilently) {
            return;
        }

        clientRef.current = new ApolloClient({
            uri: process.env.REACT_APP_GRAPHQL_API_ENDPOINT,
            credentials: 'include',
            request: async operation => {
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
            },
        });
    }, [getTokenSilently, user]);

    if (loading) {
        return <FullscreenSpin />;
    }

    const router = (
        <Router history={history}>
            <Switch>
                <PrivateRoute path="/private" component={Test} />
                <Route path="/" component={isAuthenticated ? Home : LandingPage} />
            </Switch>
        </Router>
    );

    /**
     * ApolloClient won't be initialized into the auth token
     * is set, so don't render the ApolloProvider until
     * that point.
     */
    return isAuthenticated && user && getTokenSilently && clientRef.current ? (
        <ApolloProvider client={clientRef.current}>{router}</ApolloProvider>
    ) : (
        router
    );
};

export default App;
