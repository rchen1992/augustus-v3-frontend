import React, { useState, useEffect, useContext } from 'react';
import createAuth0Client from '@auth0/auth0-spa-js';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';

export interface Auth0User extends Omit<IdToken, '__raw'> {}

interface Auth0Context {
    user?: Auth0User;
    isAuthenticated: boolean;
    loading: boolean;
    popupOpen: boolean;
    loginWithPopup(options?: PopupLoginOptions): Promise<void>;
    handleRedirectCallback(): Promise<RedirectLoginResult>;
    getIdTokenClaims(options?: getIdTokenClaimsOptions): Promise<IdToken>;
    loginWithRedirect(options?: RedirectLoginOptions): Promise<void>;
    getTokenSilently(options?: GetTokenSilentlyOptions): Promise<string | undefined>;
    getTokenWithPopup(options?: GetTokenWithPopupOptions): Promise<string | undefined>;
    logout(options?: LogoutOptions): void;
}

interface Auth0ProviderProps extends Auth0ClientOptions {
    onRedirectCallback(result: RedirectLoginResult): void;
}

export const Auth0Context = React.createContext<Auth0Context | null>(null);
export const useAuth0 = () => useContext(Auth0Context)!;

const Auth0Provider: React.FC<Auth0ProviderProps> = ({
    children,
    onRedirectCallback,
    ...initOptions
}) => {
    const [isAuthenticated, setIsAuthenticated] = useState();
    const [user, setUser] = useState<Auth0User>();
    const [auth0Client, setAuth0] = useState<Auth0Client>();
    const [loading, setLoading] = useState(true);
    const [popupOpen, setPopupOpen] = useState(false);

    useEffect(() => {
        const initAuth0 = async () => {
            const auth0FromHook = await createAuth0Client(initOptions);
            setAuth0(auth0FromHook);

            if (window.location.search.includes('code=')) {
                const redirectResult = await auth0FromHook.handleRedirectCallback();
                onRedirectCallback(redirectResult);
            }

            const isAuthenticated = await auth0FromHook.isAuthenticated();

            setIsAuthenticated(isAuthenticated);

            if (isAuthenticated) {
                const user = await auth0FromHook.getUser();
                setUser(user);
            }

            setLoading(false);
        };
        initAuth0();
        // eslint-disable-next-line
    }, []);

    const loginWithPopup = async (options?: PopupLoginOptions) => {
        setPopupOpen(true);
        try {
            await auth0Client!.loginWithPopup(options);
        } catch (error) {
            console.error(error);
        } finally {
            setPopupOpen(false);
        }
        const user = await auth0Client!.getUser();
        setUser(user);
        setIsAuthenticated(true);
    };

    const handleRedirectCallback = async () => {
        setLoading(true);

        const result = await auth0Client!.handleRedirectCallback();
        const user = await auth0Client!.getUser();

        setLoading(false);
        setIsAuthenticated(true);
        setUser(user);

        return result;
    };

    return (
        <Auth0Context.Provider
            value={{
                isAuthenticated,
                user,
                loading,
                popupOpen,
                loginWithPopup,
                handleRedirectCallback,
                getIdTokenClaims: (...p) => auth0Client!.getIdTokenClaims(...p),
                loginWithRedirect: (...p) => auth0Client!.loginWithRedirect(...p),
                getTokenSilently: (...p) => auth0Client!.getTokenSilently(...p),
                getTokenWithPopup: (...p) => auth0Client!.getTokenWithPopup(...p),
                logout: (...p) => auth0Client!.logout(...p),
            }}
        >
            {children}
        </Auth0Context.Provider>
    );
};

export default Auth0Provider;
