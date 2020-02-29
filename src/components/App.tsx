import React, { useRef } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import history from 'routerHistory';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { useAuth0 } from 'providers/Auth0Provider';
import LandingPage from 'pages/LandingPage';
import LadderInvite from 'pages/LadderInvite';
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
    const clientRef = useRef<ApolloClient<unknown> | null>(null);

    /**
     * We don't want to render anything until we are done loading,
     * because we don't know if the current user is authed or not.
     *
     * Once we are done loading and we know whether the user is authed,
     * we can construct an Apollo client with the correct closure over the
     * `user` and `getTokenSilently` variables.
     *
     * Important: we can only provide a single Apollo client
     * to ApolloProvider the very first time it renders.
     * If we try to dynamically re-construct Apollo client when props/state changes,
     * and then re-render ApolloProvider with the new client, the dev tools
     * seem to break.
     * What we are doing here works because we only ever create the Apollo client
     * once after we have determined the auth state (and we save it in a ref
     * so that we can check if it already exists), and then we render ApolloProvider
     * for the first time afterwards.
     */
    if (loading) {
        return <FullscreenSpin />;
    } else if (!clientRef.current) {
        clientRef.current = new ApolloClient({
            uri: process.env.REACT_APP_GRAPHQL_API_ENDPOINT,
            credentials: 'include',
            request: async operation => {
                /**
                 * If user isn't authed (which is possible in our app because we have public pages),
                 * we won't send any token at all.
                 */
                if (!user || !getTokenSilently) {
                    return;
                }

                /**
                 * If user is authed, we need to set Authorization token
                 * from Auth0 on every request to authenticate the user on the backend.
                 */
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
    }

    const router = (
        <Router history={history}>
            <Switch>
                <PrivateRoute path="/private" component={Test} />
                <PrivateRoute path="/invite/:token" component={LadderInvite} />
                <Route path="/ladders/:ladderId" component={Ladder} />
                <Route path="/" exact component={isAuthenticated ? Home : LandingPage} />
                <Route path="*">
                    <NotFoundRoute />
                </Route>
            </Switch>
        </Router>
    );

    return <ApolloProvider client={clientRef.current}>{router}</ApolloProvider>;
};

export default App;
