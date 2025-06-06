import { defineFunction } from "@aws-amplify/backend";

export const postAuthHandler = defineFunction({
  name: "post-auth-handler",
  entry: "./handler.ts",
});
