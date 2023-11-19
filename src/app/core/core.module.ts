import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import * as fr from '@angular/common/locales/fr';
import { httpInterceptorProviders } from './interceptors';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';


@NgModule({
  declarations: [
    MainLayoutComponent,
    SidenavComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule
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
