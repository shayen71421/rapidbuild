"use client";

import { onIdTokenChanged, type User } from "firebase/auth";
import { createContext, useEffect, useMemo, useState } from "react";
import { getFirebaseAuth } from "@/lib/firebase";
import type { AuthContextValue } from "@/types/auth";

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getFirebaseAuth();
    return onIdTokenChanged(auth, (nextUser) => {
      setUser(nextUser);
      setLoading(false);

      if (nextUser) {
        document.cookie = "rapidbuild_auth=1; path=/; max-age=604800; samesite=lax";
      } else {
        document.cookie = "rapidbuild_auth=; path=/; max-age=0; samesite=lax";
      }
    });
  }, []);

  async function refreshUser() {
    const auth = getFirebaseAuth();
    await auth.currentUser?.reload();
    setUser(auth.currentUser);
  }

  const value = useMemo(() => ({ user, loading, refreshUser }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
