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
          metadataContent: 'https://login.microsoftonline.com/6c62ce1b-36c4-4f2d-a827-069c37e92080/federationmetadata/2007-06/federationmetadata.xml?appid=44302f3d-8474-4981-988d-0bc17cc1d193', // or content of the metadata file
          metadataType: 'URL',
        },
        attributeMapping: {
          email: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
        }
      },
      logoutUrls: ['https://default-cognito.d14p5z06ominpn.amplifyapp.com'],
      callbackUrls: ['https://default-cognito.d14p5z06ominpn.amplifyapp.com'],
    },
  },
});
