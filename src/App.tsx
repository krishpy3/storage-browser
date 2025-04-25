import { useEffect, useState } from "react";
import { getCurrentUser, signOut } from "aws-amplify/auth";
import { StorageBrowser } from "../components/Storage";
import LandingPage from "./LandingPage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    getCurrentUser()
      .then((user) => {
        setIsAuthenticated(true);
        const name = user.username || user.signInDetails?.loginId || "User";
        setUserName(name);
      })
      .catch(() => {
        setIsAuthenticated(false);
      });
  }, []);

  const handleSignOut = async () => {
    await signOut();

    // const tenantId = ""; // Replace with your tenant ID
    const redirectUri = "https://yourapp.com"; // Replace with your frontend URL
    const logoutUrl = `https://login.microsoftonline.com/common/oauth2/logout?post_logout_redirect_uri=${encodeURIComponent(
      redirectUri
    )}`;

    window.location.href = logoutUrl;
  };
  if (isAuthenticated === null) {
    return <p>Loading...</p>;
  }

  return isAuthenticated ? (
    <main>
      <h1>Welcome, {userName}</h1>
      <h2>Storage Browser</h2>
      <StorageBrowser />
      <button onClick={handleSignOut}>
        Sign out
      </button>
    </main>
  ) : (
    <LandingPage />
  );
}

export default App;
