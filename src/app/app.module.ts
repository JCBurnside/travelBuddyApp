import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule }   from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth'

import { firebaseConfig } from '../environments/firebase.config';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { FirebaseService } from './services/auth.service';
import { routes } from './services/routes';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    RouterModule.forRoot(routes),
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig)

  ],
  providers: [FirebaseService, AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
