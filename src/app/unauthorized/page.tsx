"use client";
import { useRouter } from "next/navigation";
import { useUserRole, getDefaultRouteForRole } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { withAuth } from "@/hooks/HOC";

function UnauthorizedPage() {
  const router = useRouter();
  const { user, loading } = useUserRole();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleRedirect = () => {
    if (user) {
      // User is logged in but doesn't have the right role
      const defaultRoute = getDefaultRouteForRole(user.role as string);
      router.push(defaultRoute);
    } else {
      // User is not logged in
      router.push("/login");
    }
  };

  const handleGoHome = () => {
    if (user) {
      const defaultRoute = getDefaultRouteForRole(user.role as string);
      router.push(defaultRoute);
    } else {
      router.push("/");
    }
  };

  if (!mounted || loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          {/* Error Icon */}
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
            <svg
              className="h-8 w-8 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
            Accès non autorisé
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            {user ? (
              <>
                Désolé, vous n'avez pas les permissions nécessaires pour accéder à cette page.
                <br />
                <span className="text-sm text-gray-500 mt-2 block">
                  Votre rôle actuel: <span className="font-medium">{user.role as string}</span>
                </span>
              </>
            ) : (
              "Vous devez vous connecter pour accéder à cette page."
            )}
          </p>
        </div>

        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-4">
            {user ? (
              <>
                <button
                  onClick={handleRedirect}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
                >
                  Aller à mon espace
                </button>
                <button
                  onClick={handleGoHome}
                  className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
                >
                  Retour à l'accueil
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleRedirect}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
                >
                  Se connecter
                </button>
                <button
                  onClick={() => router.push("/register")}
                  className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
                >
                  Créer un compte
                </button>
                <button
                  onClick={handleGoHome}
                  className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-500 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-200"
                >
                  Retour à l'accueil
                </button>
              </>
            )}
          </div>

          {user && (
            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  localStorage.removeItem("user");
                  router.push("/login");
                }}
                className="text-sm text-red-600 hover:text-red-500 underline"
              >
                Se déconnecter et changer de compte
              </button>
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Besoin d'aide ?{" "}
            <a
              href="/profil/aide"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Contactez le support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
} 

export default withAuth(UnauthorizedPage, "OPTIONAL");