"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { SignOutButton } from "@/components/auth/SignOutButton";
import { useAuth } from "@/hooks/useAuth";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-paper px-6 py-10 text-ink">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200 pb-6">
            <div>
              <p className="text-sm font-medium text-signal">Protected workspace</p>
              <h1 className="mt-2 text-3xl font-bold">Dashboard</h1>
            </div>
            <SignOutButton />
          </div>

          <section className="mt-8 grid gap-4 md:grid-cols-3">
            <Metric label="Signed in as" value={user?.email ?? "Unknown"} />
            <Metric label="Auth provider" value="Firebase" />
            <Metric label="Database" value="Firestore" />
          </section>
        </div>
      </main>
    </ProtectedRoute>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-5">
      <p className="text-sm text-neutral-500">{label}</p>
      <p className="mt-2 break-words text-lg font-semibold">{value}</p>
    </div>
  );
}
