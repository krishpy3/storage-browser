import { defineAuth, defineFunction } from "@aws-amplify/backend";
import { SAML_METADATA_URL, AMPLIFY_URL } from "../../amplify-config";

const addToAuditor = defineFunction({
  entry: "./add-to-auditor.ts",
});

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
        attributeMapping: {
          email:
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress",
        },
      },
      callbackUrls: [AMPLIFY_URL],
      logoutUrls: [AMPLIFY_URL + "/logout/"],
    },
  },
  groups: ["admin", "auditor"],
  triggers: {
    postConfirmation: addToAuditor,
  },
});
