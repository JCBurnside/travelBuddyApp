import { SigninComponent } from '../signin/signin.component';
import { SignupComponent } from '../signup/signup.component';
import { ProfileViewComponent } from '../profile-view/profile-view.component';

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
        path     : 'profile',
        component: ProfileViewComponent
      }
]