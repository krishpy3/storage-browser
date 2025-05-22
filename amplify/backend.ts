import { defineBackend } from "@aws-amplify/backend";
import { Effect, Policy, PolicyStatement } from "aws-cdk-lib/aws-iam";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { auth } from "./auth/resource";
import { storage } from "./storage/resource";
import { BUCKET_NAME, BUCKET_REGION } from "../amplify-config";

const backend = defineBackend({
  auth,
  storage,
});

// const customBucketStack = backend.createStack("custom-bucket-stack");

// // Import existing bucket
// const customBucket = Bucket.fromBucketAttributes(customBucketStack, "MyCustomBucket", {
//   bucketArn: `arn:aws:s3:::${BUCKET_NAME}`,
//   region: BUCKET_REGION
// });

// backend.addOutput({
//   storage: {
//     aws_region: customBucket.env.region,
//     bucket_name: customBucket.bucketName,
//     buckets: [
//       {
//         aws_region: customBucket.env.region,
//         bucket_name: customBucket.bucketName,
//         name: customBucket.bucketName,
//         paths: {
//           "public/*": {
//             guest: ["get", "list"],
//             authenticated: ["get", "list", "write", "delete"],
//           },
//         },
//       },
//       {
//         aws_region: customBucket.env.region,
//         bucket_name: "baff-demo-storage-browser2",
//         name: "bucket2",
//         paths: {
//           "public/*": {
//             guest: ["get", "list"],
//             authenticated: ["get", "list", "write", "delete"],
//           },
//         },
//       }
//     ]
//   },
// });

// const unauthPolicy = new Policy(backend.stack, "customBucketUnauthPolicy", {
//   statements: [
//     new PolicyStatement({
//       effect: Effect.ALLOW,
//       actions: ["s3:GetObject"],
//       resources: [`${customBucket.bucketArn}/public/*`],
//     }),
//     new PolicyStatement({
//       effect: Effect.ALLOW,
//       actions: ["s3:ListBucket"],
//       resources: [
//         `${customBucket.bucketArn}`,
//         `${customBucket.bucketArn}/*`
//       ],
//       conditions: {
//         StringLike: {
//           "s3:prefix": ["public/", "public/*"],
//         },
//       },
//     }),
//   ],
// });

// // Add the policies to the unauthenticated user role
// backend.auth.resources.unauthenticatedUserIamRole.attachInlinePolicy(
//   unauthPolicy,
// );
