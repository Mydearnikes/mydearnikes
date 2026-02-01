

// store/authStore.ts - CREATE THIS NEW FILE

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ShopifyCustomer, CustomerAccessToken } from "@/types/shopify";
import {
  signUpCustomer,
  loginCustomer,
  getCustomer,
  logoutCustomer,
  renewAccessToken,
  isTokenExpired,
  recoverPassword,
} from "@/lib/shopify/shopify-auth";

interface AuthStore {
  customer: ShopifyCustomer | null;
  accessToken: string | null;
  tokenExpiresAt: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  signUp: (
    email: string,
    password: string,
    firstName?: string,
    lastName?: string
  ) => Promise<{ success: boolean; errors: string[] }>;
  
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; errors: string[] }>;
  
  logout: () => Promise<void>;
  
  refreshCustomer: () => Promise<void>;
  
  checkAndRenewToken: () => Promise<void>;
  
  requestPasswordReset: (email: string) => Promise<{ success: boolean; errors: string[] }>;
  
  clearError: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      customer: null,
      accessToken: null,
      tokenExpiresAt: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      signUp: async (email, password, firstName, lastName) => {
        try {
          set({ isLoading: true, error: null });

          const { customer, errors } = await signUpCustomer(
            email,
            password,
            firstName,
            lastName
          );

          if (errors.length > 0) {
            set({ error: errors.join(", "), isLoading: false });
            return { success: false, errors };
          }

          if (!customer) {
            set({ error: "Failed to create account", isLoading: false });
            return { success: false, errors: ["Failed to create account"] };
          }

          // Auto-login after signup
          const loginResult = await get().login(email, password);
          return loginResult;
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Signup failed";
          set({ error: errorMessage, isLoading: false });
          return { success: false, errors: [errorMessage] };
        }
      },

      login: async (email, password) => {
        try {
          set({ isLoading: true, error: null });

          const { accessToken, errors } = await loginCustomer(email, password);

          if (errors.length > 0) {
            set({ error: errors.join(", "), isLoading: false });
            return { success: false, errors };
          }

          if (!accessToken) {
            set({ error: "Failed to login", isLoading: false });
            return { success: false, errors: ["Failed to login"] };
          }

          // Fetch customer details
          const customer = await getCustomer(accessToken.accessToken);

          if (!customer) {
            set({ error: "Failed to fetch customer details", isLoading: false });
            return { success: false, errors: ["Failed to fetch customer details"] };
          }

          set({
            customer,
            accessToken: accessToken.accessToken,
            tokenExpiresAt: accessToken.expiresAt,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });

          return { success: true, errors: [] };
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Login failed";
          set({ error: errorMessage, isLoading: false });
          return { success: false, errors: [errorMessage] };
        }
      },

      logout: async () => {
        const { accessToken } = get();
        if (accessToken) {
          await logoutCustomer(accessToken);
        }

        set({
          customer: null,
          accessToken: null,
          tokenExpiresAt: null,
          isAuthenticated: false,
          error: null,
        });
      },

      refreshCustomer: async () => {
        const { accessToken } = get();
        if (!accessToken) return;

        try {
          const customer = await getCustomer(accessToken);
          if (customer) {
            set({ customer });
          } else {
            // Token might be invalid, logout
            await get().logout();
          }
        } catch (error) {
          console.error("Failed to refresh customer:", error);
          await get().logout();
        }
      },

      checkAndRenewToken: async () => {
        const { accessToken, tokenExpiresAt } = get();
        
        if (!accessToken || !tokenExpiresAt) return;

        // Check if token is expired or about to expire
        if (isTokenExpired(tokenExpiresAt)) {
          try {
            const newToken = await renewAccessToken(accessToken);
            
            if (newToken) {
              set({
                accessToken: newToken.accessToken,
                tokenExpiresAt: newToken.expiresAt,
              });
            } else {
              // Failed to renew, logout
              await get().logout();
            }
          } catch (error) {
            console.error("Failed to renew token:", error);
            await get().logout();
          }
        }
      },

      requestPasswordReset: async (email) => {
        try {
          set({ isLoading: true, error: null });
          
          const errors = await recoverPassword(email);
          
          if (errors.length > 0) {
            set({ error: errors.join(", "), isLoading: false });
            return { success: false, errors };
          }

          set({ isLoading: false });
          return { success: true, errors: [] };
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Password reset failed";
          set({ error: errorMessage, isLoading: false });
          return { success: false, errors: [errorMessage] };
        }
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        customer: state.customer,
        accessToken: state.accessToken,
        tokenExpiresAt: state.tokenExpiresAt,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);