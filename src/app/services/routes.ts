import { SigninComponent } from '../signin/signin.component';
import { SignupComponent } from '../signup/signup.component';

export const routes = [
	{
        path: 'signin',
        component: SigninComponent
      },
      {
      	path: 'signup',
      	component: SignupComponent
      }
]