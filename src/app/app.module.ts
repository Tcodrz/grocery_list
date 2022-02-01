import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListInviteComponent } from './core/components/list-invite/list-invite.component';
import { SpinnerInterceptor } from './core/interceptors/spinner.interceptor';
import { ListModule } from './list/list.module';
import { LoginModule } from './login/login.module';
import { PrimeModule } from './prime/prime.module';
import { SharedModule } from './shared/shared.module';
import { StateModule } from './state/state.module';


@NgModule({
  declarations: [
    AppComponent,
    ListInviteComponent,
  ],
  imports: [
    AdminModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    ListModule,
    LoginModule,
    PrimeModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      // or after 30 seconds (whichever comes first).
      // Register the ServiceWorker as soon as the app is stable
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000'
    }),
    SharedModule,
    StateModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
