import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as s3 from '@aws-cdk/aws-s3'
import * as s3deploy from '@aws-cdk/aws-s3-deployment'
import { S3ApiDefinition } from '@aws-cdk/aws-apigateway';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as apigw  from '@aws-cdk/aws-apigatewayv2';
import * as integrations from '@aws-cdk/aws-apigatewayv2-integrations';


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
    //DynamoDB Table
    const table = new dynamodb.Table(this, 'Todos', {
      partitionKey: { name: 'path', type: dynamodb.AttributeType.STRING }
    });

    // defines an AWS Lambda resource
    const dynamoLambda = new lambda.Function(this, 'DynamoLambdaHandler', {
      runtime: lambda.Runtime.NODEJS_14_X,      // execution environment
      code: lambda.Code.fromAsset('lambda'),  // code loaded from the "lambda" directory
      handler: 'todo.handler',                // file is "lambda", function is "hello"
      environment: {
        HITS_TABLE_NAME: table.tableName
      }
    });

    // grant the lambda role read/write permissions to our table
    table.grantReadWriteData(dynamoLambda);

    // // defines an API Gateway Http API resource backed by our "dynamoLambda" function.
    // let api = new apigw.HttpApi(this, 'Endpoint', {
    //   defaultIntegration: new integrations.HttpLambdaIntegration('test', dynamoLambda)
    // });    

  }
}