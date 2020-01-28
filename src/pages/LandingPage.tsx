import React from 'react';
import { useAuth0 } from 'providers/Auth0Provider';

function LandingPage() {
    const { isAuthenticated, loginWithRedirect, user } = useAuth0();

    return (
        <div>
            <header>Augustus Landing Page!</header>
            {isAuthenticated && <div>I AM AUTHENTICATED. {JSON.stringify(user)}</div>}
            {!isAuthenticated && (
                <div>
                    <button onClick={loginWithRedirect}>Login</button>
                    <button onClick={loginWithRedirect}>Sign Up</button>
                </div>
            )}
        </div>
    );
}

export default LandingPage;
