import iam, { ManagedPolicy, Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam';

export function createRole(scope) {
  return new Role(scope, 'LambdaRole', {
    assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
    inlinePolicies: {
      LambdaPolicy: new iam.PolicyDocument({
        statements: [
          new iam.PolicyStatement({
            actions: ['s3:*'],
            effect: iam.Effect.ALLOW,
            resources: ['*'],
          }),
          new iam.PolicyStatement({
            actions: ['xray:PutTraceSegments', 'xray:PutTelemetryRecords'],
            effect: iam.Effect.ALLOW,
            resources: ['*'],
          }),
          new iam.PolicyStatement({
            actions: ['dynamodb:*'],
            effect: iam.Effect.ALLOW,
            resources: ['*'],
          }),
          new iam.PolicyStatement({
            actions: ['cognito:*'],
            effect: iam.Effect.ALLOW,
            resources: ['*'],
          }),
          new iam.PolicyStatement({
            actions: ['ses:*'],
            effect: iam.Effect.ALLOW,
            resources: ['*'],
          }),
        ],
      }),
    },
    managedPolicies: [ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole')],
  });
}
