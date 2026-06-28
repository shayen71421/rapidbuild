"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

export function ProtectedRoute({ children, requireVerifiedEmail = false }: { children: React.ReactNode; requireVerifiedEmail?: boolean }) {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/signin");
    }
  }, [loading, router, user]);

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center bg-paper text-sm text-neutral-600">Checking your session...</div>;
  }

  if (!user) {
    return null;
  }

  if (requireVerifiedEmail && !user.emailVerified) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-paper px-6">
        <div className="max-w-md rounded-lg border border-neutral-200 bg-white p-6 text-center">
          <h1 className="text-xl font-semibold">Verify your email</h1>
          <p className="mt-2 text-sm leading-6 text-neutral-600">Check your inbox and verify your email before continuing.</p>
        </div>
      </main>
    );
  }

  return <>{children}</>;
}
