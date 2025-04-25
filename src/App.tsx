import { useEffect, useState } from "react";
import { getCurrentUser } from "aws-amplify/auth";
import { StorageBrowser } from "../components/Storage";
import LandingPage from "./LandingPage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    if (window.location.pathname === "/logout-complete") {
      const tenantId = "6c62ce1b-36c4-4f2d-a827-069c37e92080";
      const finalRedirectUri = "https://default-cognito.d14p5z06ominpn.amplifyapp.com";

      const microsoftLogoutUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/logout?post_logout_redirect_uri=${encodeURIComponent(finalRedirectUri)}`;
      window.location.href = microsoftLogoutUrl;
      return;
    }

    // Normal session check
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

  const handleSignOut = () => {
    const redirectAfterCognito = "https://default-cognito.d14p5z06ominpn.amplifyapp.com/logout-complete";
    const cognitoLogoutUrl = `https://64d24683309ce5cfce78.auth.us-east-1.amazoncognito.com/logout?client_id=1j2u7spdithuthome35lh84pg1&redirect_uri=${encodeURIComponent(redirectAfterCognito)}`;

    window.location.href = cognitoLogoutUrl;
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
