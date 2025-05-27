import { AuthConfig } from 'angular-oauth2-oidc';
import {environment} from '../../../environments/environment.development';

export const authCodeFlowConfig: AuthConfig = {
  issuer: environment.keyCloakUrl + '/realms/FSA',
  redirectUri: environment.appUrl,
  clientId: 'springboot-app',
  responseType: 'code',
  scope: 'openid profile email',
  showDebugInformation: true,
  strictDiscoveryDocumentValidation: false,
  requireHttps: false
};
