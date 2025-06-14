export const BUCKET_NAME = "baff-demo-storage-browser";
export const BUCKET_REGION = "us-east-1";
export const TENANT_ID = "6c62ce1b-36c4-4f2d-a827-069c37e92080";

export const ATTRIBUTE_MAPPING = {
  email: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress",
  "custom:groups":
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/groups",
};
export const SAML_METADATA_URL =
  "https://login.microsoftonline.com/6c62ce1b-36c4-4f2d-a827-069c37e92080/federationmetadata/2007-06/federationmetadata.xml?appid=44302f3d-8474-4981-988d-0bc17cc1d193";

export const AMPLIFY_URL =
  "https://default-cognito.d2n6429g3ylm0c.amplifyapp.com";
