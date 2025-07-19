"use client";

import React, { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserRole, getDefaultRouteForRole } from "./useAuth";

function Loader() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  );
}

export const RouteRole = {
  AUTHORIZED: "AUTHORIZED",
  NOT_AUTHORIZED: "NOT_AUTHORIZED",
  OPTIONAL: "OPTIONAL",
} as const;

export type RouteRoleType = keyof typeof RouteRole;

export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  routeRole: RouteRoleType = "OPTIONAL",
  allowedRoles: string[] = [],
  redirectPath: string = "/unauthorized"
) {
  return function ComponentWithAuth(props: P) {
    const router = useRouter();
    const { user, loading } = useUserRole();

    const hasAnyRole = useCallback(
      (roles: string[]) => {
        return user?.role && roles.includes(user.role as string);
      },
      [user?.role]
    );

    useEffect(() => {
      if (!loading) {
        if (routeRole === RouteRole.NOT_AUTHORIZED && user) {
          router.push(getDefaultRouteForRole(user?.role as string));
          return;
        }

        if (routeRole === RouteRole.AUTHORIZED && !user) {
          const currentPath = window.location.pathname;
          router.push(
            `/login?redirect=${encodeURIComponent(currentPath)}`
          );
          return;
        }

        if (user && allowedRoles.length > 0 && !hasAnyRole(allowedRoles)) {
          router.push(redirectPath);
          return;
        }
      }
    }, [loading, router, user, hasAnyRole]);

    if (loading) {
      return <Loader />;
    }

    if (routeRole === RouteRole.NOT_AUTHORIZED && !user) {
      return <Component {...props} />;
    }

    if (
      (routeRole === RouteRole.AUTHORIZED ||
        routeRole === RouteRole.OPTIONAL) &&
      user &&
      (allowedRoles.length === 0 || hasAnyRole(allowedRoles))
    ) {
      return <Component {...props} />;
    }

    if (routeRole === RouteRole.OPTIONAL) {
      return <Component {...props} />;
    }

    return <Loader />;
  };
}

export function withAdminOnly<P extends object>(
  Component: React.ComponentType<P>,
  redirectPath: string = "/unauthorized"
) {
  return withAuth(Component, "AUTHORIZED", ["admin"], redirectPath);
}

export function withModeratorOnly<P extends object>(
  Component: React.ComponentType<P>,
  redirectPath: string = "/unauthorized"
) {
  return withAuth(Component, "AUTHORIZED", ["client"], redirectPath);
}

export function withAgentOnly<P extends object>(
  Component: React.ComponentType<P>,
  redirectPath: string = "/unauthorized"
) {
  return withAuth(Component, "AUTHORIZED", ["prestataire"], redirectPath);
}

export function withNoAuth<P extends object>(
  Component: React.ComponentType<P>
) {
  return withAuth(Component, "NOT_AUTHORIZED");
}

export const ProtectRoute = ({
  children,
  allowedRoles = [],
}: {
  children: React.ReactNode;
  allowedRoles?: string[];
}) => {
  const router = useRouter();
  const { user, loading } = useUserRole();

  const hasAnyRole = useCallback(
    (roles: string[]) => {
      return user?.role && roles.includes(user.role as string);
    },
    [user?.role]
  );

  useEffect(() => {
    if (!loading) {
      if (!user) {
        const currentPath = window.location.pathname;
        router.push(`/login?redirect=${encodeURIComponent(currentPath)}`);
        return;
      }

      if (allowedRoles.length > 0 && !hasAnyRole(allowedRoles)) {
        router.push("/unauthorized");
      }
    }
  }, [loading, router, user, allowedRoles, hasAnyRole]);

  if (loading) {
    return <Loader />;
  }

  if (user && (allowedRoles.length === 0 || hasAnyRole(allowedRoles))) {
    return <>{children}</>;
  }

  return <Loader />;
};
