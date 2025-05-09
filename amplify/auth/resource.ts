// import { defineAuth } from '@aws-amplify/backend';
import { referenceAuth } from '@aws-amplify/backend';
/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
// export const auth = defineAuth({
//   loginWith: {
//     email: true,
//     externalProviders: {
//       saml: {
//         name: 'Azure2',
//         metadata: {
//           metadataContent: 'https://login.microsoftonline.com/6c62ce1b-36c4-4f2d-a827-069c37e92080/federationmetadata/2007-06/federationmetadata.xml?appid=6f5f938a-ef6f-4410-98ff-55182070d2fc', // or content of the metadata file
//           metadataType: 'URL',
//         },
//         attributeMapping: {
//           email: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
//         }
//       },
//       logoutUrls: ['https://main.d3lhnsq1zkfold.amplifyapp.com'],
//       callbackUrls: ['https://main.d3lhnsq1zkfold.amplifyapp.com'],
//     },
//   },
// });

export const auth = referenceAuth({
  userPoolId: 'us-east-1_p59ybBZVE',
  identityPoolId: 'us-east-1:522c4f60-6398-43dd-ace6-28a6c2069ec6',
  authRoleArn: 'arn:aws:iam::637423644627:role/Auth-CognitoRole',
  unauthRoleArn: 'arn:aws:iam::637423644627:role/Auth-UnAuth-CognitoRole',
  userPoolClientId: '3090t5hkr3pdsugk9shkmc38oa',
});
