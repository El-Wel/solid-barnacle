import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as s3deploy from '@aws-cdk/aws-s3-deployment';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as apigw  from '@aws-cdk/aws-apigatewayv2';
import * as integrations from '@aws-cdk/aws-apigatewayv2-integrations';
import * as lambdanodejs from '@aws-cdk/aws-lambda-nodejs';

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
    });
    //DynamoDB Table
    const table = new dynamodb.Table(this, 'Todos', {
      partitionKey: { name: 'path', type: dynamodb.AttributeType.STRING }
    });

    // create lambda NodejsFunction with extension 'get'
    const getLambda = new lambdanodejs.NodejsFunction(this, 'get');

    const deleteLambda = new lambdanodejs.NodejsFunction(this, 'delete');

    // grant the lambda role read/write permissions to our table
    table.grantReadWriteData(getLambda);

    // declare integration for the get function
    const getIntegration = new integrations.HttpLambdaIntegration('GetIntegration', getLambda);


    const deleteIntegration = new integrations.HttpLambdaIntegration('DeleteIntegration', deleteLambda);
    
    // declare http api that will be routed to different functions
    const todoHttpApi = new apigw.HttpApi(this, 'TodoHttpApi');

    // adding route to get lambdat
    todoHttpApi.addRoutes({
      path: '/get',
      methods: [ apigw.HttpMethod.GET ],
      integration: getIntegration,
    });

    todoHttpApi.addRoutes({
      path: '/delete',
      methods: [ apigw.HttpMethod.DELETE ],
      integration: deleteIntegration,
    });
  }
}