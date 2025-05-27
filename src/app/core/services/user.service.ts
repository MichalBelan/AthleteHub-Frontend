import { Injectable, signal } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import {authCodeFlowConfig} from '../config/authCodeFlowConfig.config';

export interface UserDto {
  id: number;
  name: string;
  email: string;
  role: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private user = signal<UserDto | undefined>(undefined);

  constructor(private oauthService: OAuthService, private http: HttpClient) {
    this.oauthService.configure(authCodeFlowConfig); // ← Uisti sa, že to máš
  }

  /** Číta readonly signal používateľa */
  getUserSignal() {
    return this.user.asReadonly();
  }

  /** Inicializácia login flowu cez APP_INITIALIZER */
  tryLogin(): Promise<void> {
    return this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      if (this.oauthService.hasValidAccessToken()) {
        this.loadUserInfo();
      }
    });
  }

  /** Spustí login cez Keycloak */
  login() {
    console.log('Spúšťam login flow...');  // <- PRIDAJ
    // window.location.href =
    //   'http://localhost:8081/realms/FSA/protocol/openid-connect/auth?client_id=springboot-app&redirect_uri=http://localhost:4200&response_type=code&scope=openid';
    this.oauthService.initLoginFlow();
  }


  /** Odhlási používateľa */
  logout() {
    this.oauthService.logOut();
  }

  /** Načíta informácie o prihlásenom používateľovi */
  private loadUserInfo() {
    this.http.get<UserDto>(environment.beUrl + '/api/users/me').subscribe({
      next: user => this.user.set(user),
      error: err => console.error('Nepodarilo sa načítať používateľa:', err)
    });
  }

  /** Getter pre access token – ak ho niekde potrebuješ */
  get token() {
    return this.oauthService.getAccessToken();
  }
}
