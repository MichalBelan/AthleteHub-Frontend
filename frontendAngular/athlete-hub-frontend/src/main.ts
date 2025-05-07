// import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
// import { AppComponent } from './app/app.component';
//
// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));

// import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
// import { AppComponent } from './app/app.component';
// import { initializeKeycloak } from './app/core/services/keycloak.service';
//
// // 1. Najprv inicializuj Keycloak
// initializeKeycloak()().then(() => {
//   // 2. Potom spusti Angular appku
//   bootstrapApplication(AppComponent, appConfig)
//     .catch(err => console.error(err));
// });

// import { bootstrapApplication } from '@angular/platform-browser';
// import { AppComponent } from './app/app.component';
// import { appConfig } from './app/app.config';
// import { inject } from '@angular/core';
// import { UserService } from './app/core/services/user.service';
//
// bootstrapApplication(AppComponent, {
//   ...appConfig,
//   providers: [
//     ...appConfig.providers,
//     {
//       provide: 'APP_INIT',
//       useFactory: () => () => inject(UserService).tryLogin(),
//       multi: true
//     }
//   ]
// });

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));



