import { create } from 'zustand';
import Keycloak from 'keycloak-js';

interface AuthState {
  isAuthenticated: boolean;
  initialized: boolean;
  profile: Keycloak.KeycloakProfile | null;
  keycloakInstance: Keycloak | null;
  initAuth: () => Promise<void>;
  login: (redirectUri?: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>(set => ({
  isAuthenticated: false,
  initialized: false,
  profile: null,
  keycloakInstance: null,
  login: (redirectUri?: string) => {
    const { keycloakInstance } = useAuthStore.getState();
    if (!keycloakInstance) {
      return;
    }
    keycloakInstance.login({
      redirectUri: redirectUri || window.location.origin,
    });
  },
  logout: () => {
    const { keycloakInstance } = useAuthStore.getState();
    if (!keycloakInstance) {
      return;
    }
    keycloakInstance.logout({
      redirectUri: window.location.origin,
    });
  },
  initAuth: async () => {
    try {
      const keycloakInstance = new Keycloak({
        url: import.meta.env.VITE_OIDC_AUTHORITY,
        realm: import.meta.env.VITE_OIDC_REALM,
        clientId: import.meta.env.VITE_OIDC_CLIENT_ID,
      });
      const authenticated = await keycloakInstance.init({
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/silent-check-sso.html',
      });

      set({
        initialized: true,
        isAuthenticated: authenticated,
        keycloakInstance,
      });

      if (authenticated) {
        const profile = await keycloakInstance.loadUserProfile();
        set({ profile });
      }
    } catch (error) {
      console.error('Failed to initialize Keycloak', error);
    }
  },
}));
