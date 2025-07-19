"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
const ROLES = {
  admin: "admin",
  client: "client",
  prestataire: "prestataire",
  les_deux: "les_deux",
};

export const useAuth = () => {
  const router = useRouter();
  const [user, setUser] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthState = async () => {
      setLoading(true);
      try {
        // Check if we're in the browser environment
        if (typeof window !== 'undefined') {
          const storedUser = localStorage.getItem("user");
          if (!storedUser) {
            console.error("User session expired or invalid");
            localStorage.removeItem("user");
            setUser(null);
          } else {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            // Only redirect if user is already logged in and we're on auth pages
            if (window.location.pathname === '/login' || window.location.pathname === '/register') {
              router.push("/services");
            }
          }
        }
      } catch (error) {
        console.error("Authentication error:", error);
        if (typeof window !== 'undefined') {
          localStorage.removeItem("user");
        }
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuthState();
  }, [router]);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem("user");
    }
    setUser(null);
    router.push("/login");
  };

  return {
    user,
    loading,
    logout: handleLogout,
  };
};

// Returns the role of the current user along with role-specific flags
export const useUserRole = () => {
  const { user, loading } = useAuth();

  return {
    user,
    loading,
    role: user?.role,
    isAdmin: user?.role === ROLES.admin,
    isClient: user?.role === ROLES.client,
    isPrestataire: user?.role === ROLES.prestataire,
    isLesDeux: user?.role === ROLES.les_deux,
  };
};

// Get the default route based on user role
export const getDefaultRouteForRole = (role?: string): string => {
  if (!role) return "/login";

  switch (role) {
    case ROLES.admin:
      return "/admin";
    case ROLES.client:
      return "/services";
    case ROLES.prestataire:
      return "/services";
    case ROLES.les_deux:
      return "/services";
    default:
      return "/services";
  }
};
