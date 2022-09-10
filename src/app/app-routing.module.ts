import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {AboutComponent} from "./components/about/about.component";
import {RegisterComponent} from "./components/register/register.component";
import {DashboardComponent} from "./components/authenticated/dashboard/dashboard.component";
import {AuthGuard} from "./shared/guards/auth.guard";
import {UsersComponent} from "./components/authenticated/users/users.component";
import {TweetsComponent} from "./components/authenticated/dashboard/tweets/tweets.component";
import {PostTweetComponent} from "./components/authenticated/dashboard/post-tweet/post-tweet.component";
import {ErrorPageComponent} from "./components/error-page/error-page.component";
import {ProfileComponent} from "./components/authenticated/profile/profile.component";

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'register', component: RegisterComponent},
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {path: '', redirectTo: '/dashboard/tweets', pathMatch: 'full'},
      {path: 'tweets', component: TweetsComponent},
      {path: 'tweet', component: PostTweetComponent},
    ]
  },
  {path: 'users', component: UsersComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'error', component: ErrorPageComponent},
  {path: '**', redirectTo: '/error', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

export {routes};
