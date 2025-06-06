import { defineBackend } from "@aws-amplify/backend";
import { Effect, Policy, PolicyStatement } from "aws-cdk-lib/aws-iam";
import { Bucket, HttpMethods } from "aws-cdk-lib/aws-s3";
import { auth } from "./auth/resource";
import { postAuthHandler } from "./functions/post-auth-handler/resource";
import * as iam from "aws-cdk-lib/aws-iam";
// import { storage } from "./storage/resource";
import { BUCKET_NAME, BUCKET_REGION } from "../amplify-config";

const backend = defineBackend({
  auth,
  postAuthHandler,
  // storage,
});

const groupLambda = backend.postAuthHandler.resources.lambda;
const policyStatement = new iam.PolicyStatement({
  actions: ["cognito-idp:AdminAddUserToGroup"],
  resources: ["*"],
});
groupLambda.addToRolePolicy(policyStatement);

const customBucketStack = backend.createStack("custom-bucket-stack");

// Import existing bucket
const customBucket = Bucket.fromBucketAttributes(
  customBucketStack,
  "MyCustomBucket",
  {
    bucketArn: `arn:aws:s3:::${BUCKET_NAME}`,
    region: BUCKET_REGION,
  }
) as Bucket;

// customBucket.addCorsRule({
//   allowedMethods: [
//     HttpMethods.GET,
//     HttpMethods.PUT,
//     HttpMethods.POST,
//     HttpMethods.DELETE,
//   ],
//   allowedOrigins: ['*'],
//   allowedHeaders: ['*'],
// });

backend.addOutput({
  storage: {
    aws_region: customBucket.env.region,
    bucket_name: customBucket.bucketName,
    buckets: [
      {
        aws_region: customBucket.env.region,
        bucket_name: customBucket.bucketName,
        name: customBucket.bucketName,
        paths: {
          "*": {
            guest: ["get", "list"],
            authenticated: ["get", "list"],
            groupsadmin: ["list", "write", "delete"],
          },
        },
      },
    ],
  },
});

const authPolicy = new Policy(backend.stack, "customBucketAuthPolicy", {
  statements: [
    new PolicyStatement({
      effect: Effect.ALLOW,
      actions: ["s3:GetObject"],
      resources: [`${customBucket.bucketArn}/public/*`],
    }),
    new PolicyStatement({
      effect: Effect.ALLOW,
      actions: ["s3:ListBucket"],
      resources: [`${customBucket.bucketArn}`, `${customBucket.bucketArn}/*`],
      conditions: {
        StringLike: {
          "s3:prefix": ["public/", "public/*"],
        },
      },
    }),
  ],
});

const adminPolicy = new Policy(backend.stack, "customBucketAdminPolicy", {
  statements: [
    new PolicyStatement({
      effect: Effect.ALLOW,
      actions: ["s3:GetObject", "s3:PutObject", "s3:DeleteObject"],
      resources: [`${customBucket.bucketArn}/*`],
    }),
    new PolicyStatement({
      effect: Effect.ALLOW,
      actions: ["s3:ListBucket"],
      resources: [`${customBucket.bucketArn}`, `${customBucket.bucketArn}/*`],
    }),
  ],
});
// Add the policies to the authenticated user role
backend.auth.resources.authenticatedUserIamRole.attachInlinePolicy(authPolicy);

backend.auth.resources.groups["admin"].role.attachInlinePolicy(adminPolicy);
