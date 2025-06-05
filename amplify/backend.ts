import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { storage } from './storage/resource';
import { Bucket, HttpMethods } from 'aws-cdk-lib/aws-s3';

defineBackend({
  auth,
  data,
  storage,
});

// Add CORS configuration to the storage bucket
const customBucket = storage.resources.bucket as Bucket;
customBucket.addCorsRule({
  allowedMethods: [
    HttpMethods.GET,
    HttpMethods.PUT,
    HttpMethods.POST,
    HttpMethods.DELETE,
  ],
  allowedOrigins: ['*'],
  allowedHeaders: ['*'],
});

