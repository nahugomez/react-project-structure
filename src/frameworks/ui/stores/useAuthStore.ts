import { create } from 'zustand';
import Keycloak from 'keycloak-js';

const keycloakInstance = new Keycloak({
  url: import.meta.env.VITE_OIDC_AUTHORITY,
  realm: import.meta.env.VITE_OIDC_REALM,
  clientId: import.meta.env.VITE_OIDC_CLIENT_ID,
});

interface AuthState {
  isAuthenticated: boolean;
  initialized: boolean;
  profile: Keycloak.KeycloakProfile | null;
  token: string | null;
  initAuth: () => Promise<void>;
  login: (redirectUri?: string) => void;
  logout: () => void;
  refreshInterval: ReturnType<typeof setInterval> | null;
}

export const useAuthStore = create<AuthState>(set => ({
  isAuthenticated: false,
  initialized: false,
  profile: null,
  token: null,
  refreshInterval: null,
  login: (redirectUri?: string) => {
    keycloakInstance.login({
      redirectUri: redirectUri || window.location.origin,
    });
  },
  logout: () => {
    const { refreshInterval } = useAuthStore.getState();
    if (refreshInterval) {
      clearInterval(refreshInterval);
      set({ refreshInterval: null });
    }
    keycloakInstance.logout({
      redirectUri: window.location.origin,
    });
    set({ token: null });
  },
  initAuth: async () => {
    try {
      const { refreshInterval } = useAuthStore.getState();
      if (refreshInterval) {
        clearInterval(refreshInterval);
      }

      const authenticated = await keycloakInstance.init({
        onLoad: 'check-sso',
        pkceMethod: 'S256',
        ...(import.meta.env.PROD
          ? {
              silentCheckSsoRedirectUri:
                window.location.origin + '/silent-check-sso.html',
            }
          : {
              checkLoginIframe: false,
              enableLogging: true,
            }),
      });

      const newInterval = setInterval(
        () => {
          keycloakInstance.updateToken(5).catch(() => {
            console.error('Failed to refresh token');
            keycloakInstance.logout();
          });
        },
        4 * 60 * 1000,
      );

      set({
        initialized: true,
        isAuthenticated: authenticated,
        refreshInterval: newInterval,
        token: authenticated ? keycloakInstance.token : null,
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
