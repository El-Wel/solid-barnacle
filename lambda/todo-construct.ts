import * as cdk from '@aws-cdk/core';
import * as lambdanodejs from '@aws-cdk/aws-lambda-nodejs';

export class TodoLambdas extends cdk.Construct {
    public readonly getHandler: lambdanodejs.NodejsFunction = new lambdanodejs.NodejsFunction(this, 'get');
}