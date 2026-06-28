"use client";

import { FormEvent, useEffect, useState } from "react";
import { updateProfile } from "firebase/auth";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { SignOutButton } from "@/components/auth/SignOutButton";
import { useToast } from "@/components/ui/ToastProvider";
import { useAuth } from "@/hooks/useAuth";
import { formatAuthError, sendVerificationEmail } from "@/lib/auth";
import { getUserProfile, upsertUserProfile } from "@/lib/firestore";

export default function ProfilePage() {
  const { user, refreshUser } = useAuth();
  const { showToast } = useToast();
  const [displayName, setDisplayName] = useState("");
  const [saving, setSaving] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      if (!user) {
        return;
      }

      const profile = await getUserProfile(user.uid);
      setDisplayName(profile?.displayName ?? user.displayName ?? "");
      setLoadingProfile(false);
    }

    void loadProfile();
  }, [user]);

  async function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!user) {
      return;
    }

    setSaving(true);
    try {
      await updateProfile(user, { displayName });
      await upsertUserProfile({
        uid: user.uid,
        email: user.email,
        displayName,
        photoURL: user.photoURL
      });
      await refreshUser();
      showToast("Profile updated.", "success");
    } catch (error) {
      showToast(formatAuthError(error), "error");
    } finally {
      setSaving(false);
    }
  }

  async function handleSendVerification() {
    if (!user) {
      return;
    }

    try {
      await sendVerificationEmail(user);
      showToast("Verification email sent.", "success");
    } catch (error) {
      showToast(formatAuthError(error), "error");
    }
  }

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-paper px-6 py-10 text-ink">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200 pb-6">
            <div>
              <p className="text-sm font-medium text-signal">Account</p>
              <h1 className="mt-2 text-3xl font-bold">Profile</h1>
            </div>
            <SignOutButton />
          </div>

          <form className="mt-8 rounded-lg border border-neutral-200 bg-white p-6" onSubmit={handleSave}>
            <label className="block text-sm font-medium">
              Display name
              <input
                className="mt-2 w-full rounded-md border border-neutral-300 px-3 py-2 outline-none ring-signal focus:ring-2"
                disabled={loadingProfile || saving}
                onChange={(event) => setDisplayName(event.target.value)}
                value={displayName}
              />
            </label>

            <div className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
              <Detail label="Email" value={user?.email ?? "No email"} />
              <Detail label="Email status" value={user?.emailVerified ? "Verified" : "Not verified"} />
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                className="rounded-md bg-ink px-4 py-2 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
                disabled={loadingProfile || saving}
                type="submit"
              >
                {saving ? "Saving..." : "Save profile"}
              </button>

              {!user?.emailVerified ? (
                <button
                  className="rounded-md border border-neutral-300 px-4 py-2 text-sm font-semibold transition hover:bg-neutral-50"
                  type="button"
                  onClick={handleSendVerification}
                >
                  Send verification email
                </button>
              ) : null}
            </div>
          </form>
        </div>
      </main>
    </ProtectedRoute>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-neutral-50 p-4">
      <p className="text-neutral-500">{label}</p>
      <p className="mt-1 break-words font-semibold">{value}</p>
    </div>
  );
}
