"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

function AuthButton() {
  const supabase = createClientComponentClient();

  const handleSignIn = async () => {
    console.log("SignIn clicked");
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: "http://localhost:3000/auth/callback",
      },
    });
  };

  const handleSignOut = async () => {
    console.log("SignOut clicked");
    await supabase.auth.signOut();
  };

  return (
    <>
      <button onClick={handleSignIn}>Login</button>
      <button onClick={handleSignOut}>Logout</button>
    </>
  );
}

export default AuthButton;