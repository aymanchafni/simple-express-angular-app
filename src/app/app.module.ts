import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MyItemsComponent } from './my-items/my-items.component';
import { ItemsComponent } from './items/items.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { OffersComponent } from './offers/offers.component';
import { ChatComponent } from './chat/chat.component';
import { ParametersComponent } from './parameters/parameters.component';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from "@angular/router";
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: 'profile/:uid',
    component: ProfileComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  },
  {
    path: 'my-items',
    component: MyItemsComponent
  },

  {
    path: 'items/:uid',
    component: ItemsComponent
  },
  {
    path: 'item-details/:iid',
    component: ItemDetailsComponent
  },

  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },

  {
    path: 'offers',
    component: OffersComponent
  },
  {
    path: 'chat',
    component: ChatComponent
  },
  {
    path: 'parameters',
    component: ParametersComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },

];

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    PageNotFoundComponent,
    HeaderComponent,
    FooterComponent,
    MyItemsComponent,
    ItemsComponent,
    ItemDetailsComponent,
    LoginComponent,
    RegisterComponent,
    OffersComponent,
    ChatComponent,
    ParametersComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
