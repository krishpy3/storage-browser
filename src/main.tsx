import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Amplify } from "aws-amplify";
// import { Authenticator } from '@aws-amplify/ui-react';
import outputs from "../amplify_outputs.json";
import '@aws-amplify/ui-react/styles.css';
Amplify.configure({
  // ...outputs,
  Auth: {
    Cognito: {
      userPoolId: "us-east-1_i5AaAwUt3",
      userPoolClientId: "3hqarhp02538n3rvbsnf0e83eq",
      identityPoolId: "us-east-1:522c4f60-6398-43dd-ace6-28a6c2069ec6",
      // userPoolId: "us-east-1_N88ncwJf8",
      // userPoolClientId: "4m3qs7gvn41gai7h4961hkja7u",
      // identityPoolId: "us-east-1:21a99846-7338-42ab-be29-e7def7a23660",
      loginWith: {
        email: true,
        oauth: {
          // domain: "47efc83bf49bab1eb71b.auth.us-east-1.amazoncognito.com",
          domain: "us-east-1i5aaawut3.auth.us-east-1.amazoncognito.com",
          redirectSignIn: ["https://main.d3lhnsq1zkfold.amplifyapp.com"],
          redirectSignOut: ["https://main.d3lhnsq1zkfold.amplifyapp.com"],
          scopes: [
            "phone",
            "email",
            "openid",
            "profile",
            "aws.cognito.signin.user.admin"
          ],
          responseType: "code"
        } 
      },
      signUpVerificationMethod: "code",
      userAttributes: {
        email: {
          required: true,
        },
      },
      allowGuestAccess: true,
      passwordFormat: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: true,
        requireNumbers: true,
        requireSpecialCharacters: true,
      },
    },
  },
  Storage: {
    S3: {
      "aws_region": "us-east-1",
    "bucket_name": "amplify-d34g0pai70sxo-main-bran-baffbucket59ef8f60-cdveufaob3bm",
    "buckets": [
      {
        "name": "baff",
        "bucket_name": "amplify-d34g0pai70sxo-main-bran-baffbucket59ef8f60-cdveufaob3bm",
        "aws_region": "us-east-1",
        "paths": {
          "profile-pictures/*": {
            "guest": [
              "get",
              "list"
            ]
          },
          "profile-pictures/${cognito-identity.amazonaws.com:sub}/*": {
            "entityidentity": [
              "get",
              "list",
              "write",
              "delete"
            ]
          },
          "picture-submissions/*": {
            "authenticated": [
              "get",
              "list",
              "write"
            ],
            "guest": [
              "get",
              "list",
              "write"
            ]
          }
        }
      }
    ]
    }
  }
});
// Amplify.configure(outputs)

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <Authenticator> */}
      <App />
    {/* </Authenticator> */}
  </React.StrictMode>
);
