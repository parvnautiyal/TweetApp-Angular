import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {FooterComponent} from './components/footer/footer.component';
import {HomeComponent} from './components/home/home.component';
import {AboutComponent} from './components/about/about.component';
import {RegisterComponent} from './components/register/register.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {DashboardComponent} from './components/authenticated/dashboard/dashboard.component';
import {UsersComponent} from './components/authenticated/users/users.component';
import {FilterPipe} from './shared/pipes/filter/filter.pipe';
import {TooltipModule} from "ng2-tooltip-directive";
import {TweetsComponent} from './components/authenticated/dashboard/tweets/tweets.component';
import {PostTweetComponent} from './components/authenticated/dashboard/post-tweet/post-tweet.component';
import {ErrorPageComponent} from './components/error-page/error-page.component';
import { ProfileComponent } from './components/authenticated/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    RegisterComponent,
    DashboardComponent,
    UsersComponent,
    FilterPipe,
    TweetsComponent,
    PostTweetComponent,
    ErrorPageComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    TooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
