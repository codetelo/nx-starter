// import * as sst from "sst/constructs";
// import {createRole} from "./roleUtils";
// import {StackContext, Api, Function} from "sst/constructs";
//
// export function KeelStack({stack}: StackContext) {
//     const environment = {
//         COGNITO_URL: this.cognitoProps.cognitoUrl ?? 'n/a',
//         COGNITO_USER_POOL_ID: this.cognitoProps.cognitoUserPoolId ?? 'n/a',
//         COGNITO_CLIENT_ID: this.cognitoProps.cognitoUserPoolClientId ?? 'n/a',
//         STAGE: scope.stage,
//         APP_NAME: scope.name,
//         DYNAMO_REGION: scope.region,
//     }
//     const role = createRole(stack);
//     const api = createApiGateway(stack, environment, role);
// }
//
// function createApiGateway(scope: sst.App, environment: { [key: string]: string }, role: iam.IRole) {
//     const authorizer = new HttpLambdaAuthorizer({
//         authorizerName: `${scope.stage}-Authorizer`,
//         handler: new Function(this, 'Authorizer', {
//             handler: "packages/server/services/users/auth/auth.authorize",
//             environment,
//             role,
//         }),
//         resultsCacheTtl: Duration.seconds(0),
//     });
//
//     this.api = new Api(this, 'Api', {
//         defaultAuthorizationType: ApiAuthorizationType.CUSTOM,
//         defaultAuthorizer: authorizer,
//         defaultFunctionProps: {
//             environment,
//             role,
//             timeout: 90,
//         },
//         customDomain: {
//             domainName: getApiDomainName(scope.stage),
//             hostedZone: process.env.DOMAIN_NAME as string,
//             certificate: Certificate.fromCertificateArn(this, 'ApiCert', process.env.AWS_CERT_ARN as string),
//         },
//     });
//
//     return {apiEndpoint: this.api.url}
// }
//
