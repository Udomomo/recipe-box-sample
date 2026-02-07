import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { BaseUrlInterceptor } from './base-url-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    // withComponentInputBindingによって、ルートのパラメータを解決済みの状態でinputにバインドできるようになる
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(
      withInterceptorsFromDi(),
    ),
    {provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true},
  ]
};
