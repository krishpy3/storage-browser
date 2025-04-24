import { signInWithRedirect } from "aws-amplify/auth";

function LandingPage() {
  const handleLogin = () => {
    signInWithRedirect({ provider: { custom: "Azure" } });
  };

  return (
    <main style={styles.container}>
      <section style={styles.contentBox}>
        <h1 style={styles.heading}>Welcome to Cloud Storage Manager</h1>
        <p style={styles.paragraph}>
          Effortlessly browse, manage, and monitor your cloud files with our secure and user-friendly storage browser.
          Sign in to explore your cloud environment with powerful visual tools and real-time insights.
        </p>
        <button style={styles.loginButton} onClick={handleLogin}>
          Login with Azure
        </button>
      </section>
    </main>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0d1117",
    color: "#ffffff",
    padding: "20px"
  },
  contentBox: {
    maxWidth: "600px",
    textAlign: "center",
    backgroundColor: "#161b22",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "1rem",
  },
  paragraph: {
    fontSize: "1.1rem",
    marginBottom: "2rem",
  },
  loginButton: {
    fontSize: "1rem",
    padding: "12px 24px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#238636",
    color: "white",
    cursor: "pointer",
  },
};

export default LandingPage;
