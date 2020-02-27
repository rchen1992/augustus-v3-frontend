import React, { useEffect } from 'react';
import { Route, RouteProps, RouteComponentProps, useLocation } from 'react-router-dom';
import { useAuth0 } from 'providers/Auth0Provider';

type RouterRender = (props: RouteComponentProps<any>) => React.ReactNode;

const PrivateRoute: React.FC<RouteProps> = ({ component: Component, path, ...rest }) => {
    const { loading, isAuthenticated, loginWithRedirect } = useAuth0();
    const location = useLocation();

    useEffect(() => {
        if (loading || isAuthenticated) {
            return;
        }

        loginWithRedirect({
            appState: { targetUrl: location.pathname },
        });
    }, [loading, isAuthenticated, loginWithRedirect, path]);

    const render: RouterRender = props =>
        isAuthenticated === true && Component ? <Component {...props} /> : null;

    return <Route path={path} render={render} {...rest} />;
};

export default PrivateRoute;
