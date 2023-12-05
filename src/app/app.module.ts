import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotificationsComponent } from './notifications/notifications.component';

@NgModule({
  declarations: [AppComponent, NotificationsComponent],
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, CoreModule, AuthModule, SharedModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {

} 
