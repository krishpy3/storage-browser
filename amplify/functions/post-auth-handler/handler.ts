import {
  CognitoIdentityProviderClient,
  AdminAddUserToGroupCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { Handler } from "aws-lambda";

export const handler: Handler = async (event) => {
  const client = new CognitoIdentityProviderClient({});
  const { userPoolId, userName } = event;
  if (typeof userPoolId === "string" && typeof userName === "string") {
    const azureGroup = event.request?.userAttributes?.["custom:azuregroup"] as
      | string
      | undefined;

    if (azureGroup) {
      await client.send(
        new AdminAddUserToGroupCommand({
          UserPoolId: userPoolId,
          Username: userName,
          GroupName: azureGroup,
        })
      );
    }
  }
  return event;
};
