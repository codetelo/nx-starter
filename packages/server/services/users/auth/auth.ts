import axios from 'axios';
import verify from 'jsonwebtoken';
import jwkToPem from 'jwk-to-pem';

import checkRoleAccess from './roleAccess';

// For Auth0:       https://<project>.auth0.com/
// refer to:        http://bit.ly/2hoeRXk
// For AWS Cognito: https://cognito-idp.<region>.amazonaws.com/<user pool id>
// refer to:        http://amzn.to/2fo77UI

// fix this code so that it recognizes process.env.COGNITO_URL

const iss = process.env.COGNITO_URL

// Generate policy to allow this user on this API:
const generatePolicy = (principalId, effect, resource) => {
  // Auth response is where you can add / remove things from the response
  const authResponse = {
    principalId: '',
    policyDocument: {
        Version: '',
        Statement: []
    },
    context: {
        sub: ''
    }
  };
  authResponse.principalId = principalId;
  if (effect && resource) {
    const policyDocument = {
      Version: '',
      Statement: []
    };
    policyDocument.Version = '2012-10-17';
    policyDocument.Statement = [];
    const statementOne = {
      Action: '',
      Effect: '',
      Resource: ''
    };
    statementOne.Action = 'execute-api:Invoke';
    statementOne.Effect = effect;
    statementOne.Resource = resource;
    policyDocument.Statement[0] = statementOne;
    authResponse.policyDocument = policyDocument;
  }

  authResponse.context = {
    sub: principalId,
  };

  return authResponse;
};

// Reusable Authorizer function, set on `authorizer` in api gateway.
export const authorize = async event => {
  if (event.authorizationToken) {
    // Remove 'bearer ' from token:
    const token = event.authorizationToken.substring(7);
    // Make a request to the iss + .well-known/jwks.json URL:
    const response = await axios({ url: `${iss}/.well-known/jwks.json` });
    const body = response.data;

    if (response.status !== 200) {
      console.log('Not a 200 from .well-known/jwks');
      throw new Error('Unauthorized');
    }
    // Based on the JSON of `jwks` create a Pem:
    const k = body.keys[0];

    const jwkArray = {
      e: k.e,
      kty: k.kty,
      n: k.n,
    };

    const pem = jwkToPem(jwkArray);
    const decoded = verify(token, pem.toString(), { algorithms: ['RS256'], issuer: iss }, jwkArray );
    await checkRoleAccess(event.methodArn, decoded.sub);

    return generatePolicy(decoded.sub, 'Allow', event.methodArn);
  }
  console.log('No authorizationToken found in the header.');
  throw new Error('Unauthorized');
};
