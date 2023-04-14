import iam, { ManagedPolicy, Role, ServicePrincipal } from '@aws-cdk/aws-iam';


export function createRole(scope) {
  return new Role(scope, 'LambdaRole', {
    assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
    inlinePolicies: {
      LambdaPolicy: new iam.PolicyDocument({
        statements: [
          new iam.PolicyStatement({
            resources: ['*'],
            actions: ['s3:*'],
            effect: iam.Effect.ALLOW,
          }),
          new iam.PolicyStatement({
            resources: ['*'],
            actions: ['xray:PutTraceSegments', 'xray:PutTelemetryRecords'],
            effect: iam.Effect.ALLOW,
          }),
          new iam.PolicyStatement({
            resources: ['*'],
            actions: ['dynamodb:*'],
            effect: iam.Effect.ALLOW,
          }),
          new iam.PolicyStatement({
            resources: ['*'],
            actions: ['cognito:*'],
            effect: iam.Effect.ALLOW,
          }),
          new iam.PolicyStatement({
            resources: ['*'],
            actions: ['cognito-idp:*'],
            effect: iam.Effect.ALLOW,
          }),
          new iam.PolicyStatement({
            resources: ['*'],
            actions: ['ses:*'],
            effect: iam.Effect.ALLOW,
          }),
        ],
      }),
    },
    managedPolicies: [ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole')],
  });
}
