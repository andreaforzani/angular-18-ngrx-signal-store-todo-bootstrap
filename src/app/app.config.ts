import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { CustomAdapterService } from './services/custom-adapter.service';
import { CustomDateParserFormatterService } from './services/custom-date-parser-formatter.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    { provide: NgbDateAdapter, useClass: CustomAdapterService },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatterService },
  ],
};
