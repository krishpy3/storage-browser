import {
  CognitoIdentityProviderClient,
  AdminAddUserToGroupCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { Handler } from "aws-lambda";

export const handler: Handler = async (event) => {
  console.log(event);
  const client = new CognitoIdentityProviderClient({});
  const { userPoolId, userName } = event;
  if (typeof userPoolId === "string" && typeof userName === "string") {
    await client.send(
      new AdminAddUserToGroupCommand({
        UserPoolId: userPoolId,
        Username: userName,
        GroupName: "auditor",
      })
    );
  }
  return event;
};
