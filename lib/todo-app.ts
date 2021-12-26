import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as s3 from '@aws-cdk/aws-s3'
import * as s3deploy from '@aws-cdk/aws-s3-deployment'
import * as apigw from '@aws-cdk/aws-apigateway';
import { S3ApiDefinition } from '@aws-cdk/aws-apigateway';

export class ToDoWebsiteStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // defines the bucket that holds the website data
    const websiteBucket = new s3.Bucket(this, 'WebsiteBucket', {
        websiteIndexDocument: 'index.html',
        publicReadAccess: true
    });

    new s3deploy.BucketDeployment(this, 'DeployWebsite', {
        sources: [s3deploy.Source.asset('./frontend/out/')],
        destinationBucket: websiteBucket,
        destinationKeyPrefix: '' // optional prefix in destination
    })

  }
}