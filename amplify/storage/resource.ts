import { defineStorage } from "@aws-amplify/backend";

export const storage = defineStorage({
  name: "baff",
  access: (allow) => ({
    "public/*": [
      // allow.groups(['<azure-group-name>']).to(['read']),
      allow.groups(["admin"]).to(["read", "write", "delete"]),
      // allow.authenticated.to(["read", "write"]),
      allow.guest.to(["read", "write"]),
    ],
  }),
});
