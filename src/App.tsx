import { useEffect } from "react";
import { getCurrentUser, signInWithRedirect, signOut } from "aws-amplify/auth";
import { StorageBrowser } from "../components/Storage";



function App() {
  useEffect(() => {
    getCurrentUser()
      .then(() => {
        console.log("User signed in")
      })
      .catch(() => {
        signInWithRedirect({ provider: { custom: "Azure" } });
      });
  }, []);

  return (
    <main>
      <h1>Storage Browser</h1>

      <StorageBrowser />
      <button onClick={() => signOut()}>
        Sign out
      </button>
    </main>
  );
}

export default App;
