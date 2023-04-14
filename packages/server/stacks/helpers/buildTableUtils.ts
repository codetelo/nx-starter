import * as sst from '@serverless-stack/resources';
import { RemovalPolicy } from 'aws-cdk-lib';

export const buildTableName = (scope: sst.App, name: string) => `augustap4p-${scope.stage}-${name}`;

export const buildTableProps = (scope: sst.App, name: string) => ({
  buildTableName: buildTableName(scope, name),
  removalPolicy: RemovalPolicy.RETAIN,
});
