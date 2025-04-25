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

  if (isAuthenticated === null) {
    return <p>Loading...</p>;
  }

  return isAuthenticated ? (
    <main>
      <h1>Welcome, {userName}</h1>
      <h2>Storage Browser</h2>
      <StorageBrowser />
      <button onClick={() => signOut()}>
        Sign out
      </button>
    </main>
  ) : (
    <LandingPage />
  );
}

export default App;
