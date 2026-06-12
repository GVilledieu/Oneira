import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

registerLocaleData(localeFr);



export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    { provide: LOCALE_ID, useValue: 'fr-FR' }
  ]
};



