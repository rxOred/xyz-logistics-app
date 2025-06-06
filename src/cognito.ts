import {
  CognitoUser,
  CognitoUserPool,
  AuthenticationDetails,
} from "amazon-cognito-identity-js";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import { REGION, COGNITO } from "./aws-config";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";

export const userPool = new CognitoUserPool({
  UserPoolId: COGNITO.USER_POOL_ID,
  ClientId: COGNITO.CLIENT_ID,
});

export async function loginUser(email: string, password: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const user = new CognitoUser({ Username: email, Pool: userPool });
    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    user.authenticateUser(authDetails, {
      onSuccess: (result) => {
        const idToken = result.getIdToken().getJwtToken();
        resolve({ user, idToken });
      },
      onFailure: reject,
    });
  });
}

export function getCognitoCredentials(idToken: string) {
  return fromCognitoIdentityPool({
    identityPoolId: COGNITO.IDENTITY_POOL_ID,
    logins: {
      [`cognito-idp.${REGION}.amazonaws.com/${COGNITO.USER_POOL_ID}`]: idToken,
    },
    client: new CognitoIdentityClient({ region: REGION }),
  });
}

export async function getCognitoCredentialsWithId(idToken: string) {
  const provider = fromCognitoIdentityPool({
    identityPoolId: COGNITO.IDENTITY_POOL_ID,
    logins: {
      [`cognito-idp.${REGION}.amazonaws.com/${COGNITO.USER_POOL_ID}`]: idToken,
    },
    client: new CognitoIdentityClient({ region: REGION }),
  });

  const credentials = await provider(); // resolves to { accessKeyId, secretAccessKey, sessionToken, identityId }

  return {
    credentials,
    identityId: (credentials as any).identityId, // cast to access internal field
  };
}
