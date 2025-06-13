import { defineAuth } from "@aws-amplify/backend";
import { postAuthHandler } from "../functions/post-auth-handler/resource";
import {
  SAML_METADATA_URL,
  AMPLIFY_URL,
  ATTRIBUTE_MAPPING,
} from "../../amplify-config";

// When used in the triggers below, this function is automatically provisioned as
// part of the auth resource; no extra import in backend.ts is required.

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
    externalProviders: {
      saml: {
        name: "Azure",
        metadata: {
          metadataContent: SAML_METADATA_URL, // or content of the metadata file
          metadataType: "URL",
        },
        attributeMapping: ATTRIBUTE_MAPPING,
      },
      callbackUrls: [AMPLIFY_URL],
      logoutUrls: [AMPLIFY_URL + "/logout/"],
    },
  },
  userAttributes: {
    "custom:azure_group": {
      dataType: "String",
      mutable: true,
      maxLen: 30,
      minLen: 1,
    },
  },
  groups: ["admin", "auditor"],
  triggers: {
    postConfirmation: postAuthHandler,
  },
});
