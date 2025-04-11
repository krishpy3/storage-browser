import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Amplify } from "aws-amplify";
// import { Authenticator } from '@aws-amplify/ui-react';
import outputs from "../amplify_outputs.json";
import '@aws-amplify/ui-react/styles.css';
// Amplify.configure({
//   // ...outputs,
//   Auth: {
//     Cognito: {
//       userPoolId: "us-east-1_BeuFo44Ef",
//       userPoolClientId: "1qbcuqpdu1b4t0sdlr48uk18as",
//       identityPoolId: "us-east-1:a00ae641-b22c-4a90-b851-371df40ff3f4",
//       loginWith: {
//         email: true,
//       },
//       signUpVerificationMethod: "code",
//       userAttributes: {
//         email: {
//           required: true,
//         },
//       },
//       allowGuestAccess: true,
//       passwordFormat: {
//         minLength: 8,
//         requireLowercase: true,
//         requireUppercase: true,
//         requireNumbers: true,
//         requireSpecialCharacters: true,
//       },
//       OAuth: 
//     },
//   },
// });
Amplify.configure(outputs)

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <Authenticator> */}
      <App />
    {/* </Authenticator> */}
  </React.StrictMode>
);
