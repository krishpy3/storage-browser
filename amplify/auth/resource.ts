import { defineAuth } from '@aws-amplify/backend';

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
    externalProviders: {
      saml: {
        name: 'Azure',
        metadata: {
          metadataContent: 'https://login.microsoftonline.com/6c62ce1b-36c4-4f2d-a827-069c37e92080/federationmetadata/2007-06/federationmetadata.xml?appid=6f5f938a-ef6f-4410-98ff-55182070d2fc', // or content of the metadata file
          metadataType: 'URL',
        },
        attributeMapping: {
          email: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
        }
      },
      // logoutUrls: ['http://localhost:5173/'],
      // callbackUrls: ['http://localhost:5173/'],
    },
  },
});
