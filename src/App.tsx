import { useEffect, useState } from "react";
import { getCurrentUser, signInWithRedirect, signOut } from "aws-amplify/auth";
import { StorageBrowser } from "../components/Storage";

function App() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    getCurrentUser()
      .then((user) => {
        console.log(user)
        const name = user.username || user.signInDetails?.loginId || "User";
        setUserName(name);
        console.log("User signed in:", name);
      })
      .catch(() => {
        signInWithRedirect({ provider: { custom: "Azure" } });
      });
  }, []);

  return (
    <main>
      <h1>Welcome {userName}</h1>
      <h2>Storage Browser</h2>

      <StorageBrowser />
      <button onClick={() => signOut()}>
        Sign out
      </button>
    </main>
  );
}

export default App;
