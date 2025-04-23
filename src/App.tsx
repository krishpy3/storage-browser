import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { getCurrentUser, signInWithRedirect, signOut } from "aws-amplify/auth";
import { StorageBrowser } from "../components/Storage";


const client = generateClient<Schema>();

function App() {
  useEffect(() => {
    // Check if user is signed in
    getCurrentUser()
      .then(() => {
        // User is signed in, fetch data
        console.log("User signed in")
        
      })
      .catch(() => {
        // Not signed in, redirect to sign in
        signInWithRedirect({ provider: { custom: "Azure" } });
      });
  }, []);

  return (
    <main>
      <h1>Storage Browser</h1>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Review next step of this tutorial.
        </a>
      </div>

      <StorageBrowser />
      <button onClick={() => signOut()}>
        Sign out
      </button>
    </main>
  );
}

export default App;
