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
    return <p style={{ color: "white", textAlign: "center", marginTop: "100px" }}>Loading...</p>;
  }

  return isAuthenticated ? (
    <main style={styles.main}>
      <h1 style={styles.heading}>Welcome, {userName}</h1>
      <h2 style={styles.subheading}>Storage Browser</h2>
      <StorageBrowser />
      <button style={styles.signOutButton} onClick={() => signOut()}>
        Sign out
      </button>
    </main>
  ) : (
    <LandingPage />
  );
}

const styles = {
  main: {
    padding: "40px",
    textAlign: "center" as const,
    color: "white",
    backgroundColor: "#0d1117",
    minHeight: "100vh",
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "0.5rem",
  },
  subheading: {
    fontSize: "1.5rem",
    marginBottom: "2rem",
  },
  signOutButton: {
    marginTop: "30px",
    padding: "12px 24px",
    fontSize: "1rem",
    backgroundColor: "#da3633",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default App;
