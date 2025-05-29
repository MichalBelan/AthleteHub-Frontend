import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { OAuthService } from 'angular-oauth2-oidc';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const oauthService = inject(OAuthService);
  const token = oauthService.getAccessToken();

  
  const isRegisterRequest = req.url.endsWith('/api/users') && req.method === 'POST';

  if (token && !isRegisterRequest) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(cloned);
  }

  return next(req);
};
