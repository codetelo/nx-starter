import { StaticSite, Stack,  App, StackProps, StackContext } from 'sst/constructs';
// import { Certificate } from 'aws-cdk-lib/aws-certificatemanager';

import { getWebDomainName } from './helpers/domainUtils';

// const { AWS_CERT_ARN } = process.env;

export const WebStack = ({stack, app}, props)=>{
   const site =  new StaticSite(stack, "Site", {
    buildCommand: 'pnpm run build',
    buildOutput: '../../dist/packages/client',
    customDomain: {
    //   certificate: Certificate.fromCertificateArn(stack, 'MyCert', AWS_CERT_ARN as string),
      domainName: getWebDomainName(app.stage),
      hostedZone: process.env.DOMAIN_NAME,
    },
    environment: {
      REACT_APP_API_URL: props?.apiUrl ?? 'n/a',
      REACT_APP_COGNITO_REGION: props?.cognitoRegion ?? 'n/a',
      REACT_APP_COGNITO_USER_POOL_ID: props?.cognitoUserPoolId ?? 'n/a',
      REACT_APP_COGNITO_USER_POOL_WEB_CLIENT_ID: props?.cognitoUserPoolClientId ?? 'n/a',
      REACT_APP_STAGE: app.stage,
    },
    path: './packages/client',
  });

  return site;
};