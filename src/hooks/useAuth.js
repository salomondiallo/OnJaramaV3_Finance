import { useEffect, useMemo, useState } from "react";
import { isSupabaseConfigured, supabase } from "../lib/supabaseClient";

function useAuth() {
  const [session, setSession] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setLoadingAuth(false);
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session || null);
      setLoadingAuth(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession || null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const user = session?.user || null;

  const authStatus = useMemo(
    () => ({
      isConfigured: isSupabaseConfigured,
      isConnected: Boolean(user),
      user,
      session,
      loadingAuth,
    }),
    [user, session, loadingAuth]
  );

  async function signInWithGoogle() {
    if (!supabase) return;

    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });
  }

  async function signInWithMicrosoft() {
    if (!supabase) return;

    await supabase.auth.signInWithOAuth({
      provider: "azure",
      options: {
        redirectTo: window.location.origin,
      },
    });
  }

  async function signOut() {
    if (!supabase) return;

    await supabase.auth.signOut();
  }

  return {
    ...authStatus,
    signInWithGoogle,
    signInWithMicrosoft,
    signOut,
  };
}

export default useAuth;