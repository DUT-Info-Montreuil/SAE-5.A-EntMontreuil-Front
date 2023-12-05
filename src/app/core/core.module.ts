import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import * as fr from '@angular/common/locales/fr';
import { httpInterceptorProviders } from './interceptors';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StyleClassModule } from 'primeng/styleclass';
import { MenuModule } from 'primeng/menu';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { BadgeModule } from 'primeng/badge';
import { NotificationsModalComponent } from './components/notifications-modal/notifications-modal.component';
import { SkeletonModule } from 'primeng/skeleton';

@NgModule({
  declarations: [
    MainLayoutComponent,
    SidenavComponent,
    NotificationsModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StyleClassModule,
    MenuModule,
    RippleModule,
    ButtonModule,
    InputTextModule,
    CheckboxModule,
    BadgeModule,
    SkeletonModule
  ],
  exports: [

  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    httpInterceptorProviders
  ]
})

export class CoreModule {
  constructor() {
    registerLocaleData(fr.default);
  }
}
