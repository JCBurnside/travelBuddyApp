import { SigninComponent } from '../signin/signin.component';
import { SignupComponent } from '../signup/signup.component';
import { ProfileViewComponent } from '../profile-view/profile-view.component';
import { SplashPageComponent } from '../splash/splash.component';
import { TripViewComponent } from '../trip-view/trip-view.component';
import { TripEditComponent } from '../trip-edit/trip-edit.component';
import { ProfileEditComponent } from '../profile-edit/profile-edit.component';
import { HomepageComponent } from '../homepage/homepage.component';

export const routes = [
  {
    path     : 'signin',
    component: SigninComponent
  },
  {
    path     : 'signup',
    component: SignupComponent
  },
  {
    path     : '',
    component: SplashPageComponent
  },
  {
    path     : 'profile/:id',
    component: ProfileViewComponent
  },
  {
    path     : 'trip-view/:id',
    component: TripViewComponent
  },
  {
    path     : 'profile-edit/:id',
    component: ProfileEditComponent
  },
  {
    path     : 'homepage',
    component: HomepageComponent
  },
  {
    path     : 'trip-edit/:id',
    component: TripEditComponent
  }
]
