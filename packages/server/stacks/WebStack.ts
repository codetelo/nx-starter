import { StaticSite, Stack,  App, StackProps } from 'sst/constructs';
import { Certificate } from 'aws-cdk-lib/aws-certificatemanager';

import { getWebDomainName } from './helpers/domainUtils';

const { AWS_CERT_ARN } = process.env;

export default class AugustaWebStack extends Stack {
  constructor(scope: App, id: string, props?: StackProps & { apiUrl: string; cognitoRegion: string; cognitoUserPoolId: string; cognitoUserPoolClientId: string }) {
    super(scope, id, props);

    new StaticSite(this, 'ReactSite', {
      buildCommand: 'yarn run build:sst-prod',
      customDomain: {
        certificate: Certificate.fromCertificateArn(this, 'MyCert', AWS_CERT_ARN as string),
        domainName: getWebDomainName(scope.stage),
        hostedZone: process.env.DOMAIN_NAME,
      },
      environment: {
        REACT_APP_API_URL: props?.apiUrl ?? 'n/a',
        REACT_APP_COGNITO_REGION: props?.cognitoRegion ?? 'n/a',
        REACT_APP_COGNITO_USER_POOL_ID: props?.cognitoUserPoolId ?? 'n/a',
        REACT_APP_COGNITO_USER_POOL_WEB_CLIENT_ID: props?.cognitoUserPoolClientId ?? 'n/a',
        REACT_APP_STAGE: scope.stage,
      },
      path: './packages/client',
    });
  }
}