import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
  APP_INITIALIZER
} from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  provideHttpClient,
  withInterceptorsFromDi
} from '@angular/common/http';

import { routes } from './app.routes';
import { OAuthModule, OAuthModuleConfig, DefaultOAuthInterceptor } from 'angular-oauth2-oidc';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from '../environments/environment.development';
import { UserService } from './core/services/user.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),

    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),

    importProvidersFrom(
      OAuthModule.forRoot({
        resourceServer: {
          sendAccessToken: true,
          allowedUrls: [`${environment.beUrl}/api`]
        }
      } as OAuthModuleConfig)
    ),

    {
      provide: HTTP_INTERCEPTORS,
      useClass: DefaultOAuthInterceptor,
      multi: true
    },


    {
      provide: APP_INITIALIZER,
      useFactory: (userService: UserService) => () => userService.tryLogin(),
      deps: [UserService],
      multi: true
    }
  ]
};
