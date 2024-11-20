import React, { createContext, useEffect, useState } from 'react';
import Keycloak from 'keycloak-js';

interface AuthContextType {
  isAuthenticated: boolean;
  initialized: boolean;
  profile: Keycloak.KeycloakProfile | null;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  initialized: false,
  profile: null,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [initialized, setInitialized] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profile, setProfile] = useState<Keycloak.KeycloakProfile | null>(null);

  useEffect(() => {
    async function init() {
      try {
        const keycloakInstance = new Keycloak({
          url: import.meta.env.VITE_OIDC_AUTHORITY,
          realm: import.meta.env.VITE_OIDC_REALM,
          clientId: import.meta.env.VITE_OIDC_CLIENT_ID,
        });

        const authenticated = await keycloakInstance.init();
        setInitialized(true);
        if (authenticated) {
          const profile = await keycloakInstance.loadUserProfile();
          setIsAuthenticated(true);
          setProfile(profile);
        } else {
          // redirect to login
          keycloakInstance.login();
        }
      } catch (error) {
        console.error('Failed to initialize Keycloak', error);
      }
    }
    init();
  }, []);

  if (!initialized) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, initialized, profile }}>
      {children}
    </AuthContext.Provider>
  );
};
