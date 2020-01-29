import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from 'components/App';
import { ThemeProvider } from 'styled-components';
import theme from 'style/theme';
import Auth0Provider from 'providers/Auth0Provider';
import config from 'config/auth_config';
import history from 'routerHistory';

const onAuthRedirectCallback = (redirectResult?: RedirectLoginResult) => {
    console.log('auth0 onRedirectCallback called with redirectState %o', redirectResult);

    // Clears auth0 query string parameters from url
    const targetUrl =
        redirectResult && redirectResult.appState && redirectResult.appState.targetUrl
            ? redirectResult.appState.targetUrl
            : window.location.pathname;

    history.push(targetUrl);
};

ReactDOM.render(
    <Auth0Provider
        domain={config.domain}
        client_id={config.clientId}
        redirect_uri={window.location.origin}
        audience={config.audience}
        onRedirectCallback={onAuthRedirectCallback}
    >
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </Auth0Provider>,
    document.getElementById('root')
);
