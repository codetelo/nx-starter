import { App } from 'sst/constructs';
import { RemovalPolicy } from 'aws-cdk-lib';

export const buildTableName = (scope: App, name: string) => `${scope.stage}-${name}`;

export const buildTableProps = (scope: App, name: string) => ({
  buildTableName: buildTableName(scope, name),
  removalPolicy: RemovalPolicy.RETAIN,
});
