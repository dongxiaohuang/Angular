import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HttpModule } from '@angular/http';
import 'hammerjs';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { DishdetailComponent } from './dishdetail/dishdetail.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactComponent } from './contact/contact.component';
import { LeaderComponent } from './leader/leader.component';

import { DishService } from './services/dish.service';
import { PromotionService } from './services/promotion.service';
import { LeaderService } from './services/leader.service';
import { LoginComponent } from './login/login.component';

import { baseURL } from './shared/baseurl';
import { ProcessHTTPMsgService } from './services/process-httpmsg.service';
 // decorator function
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DishdetailComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutusComponent,
    ContactComponent,
    LeaderComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule
  ],
  // make services available for the rest of the application
  providers: [DishService,
               PromotionService,
               LeaderService,
               ProcessHTTPMsgService,
               { provide: 'BaseURL', useValue: baseURL }],
  entryComponents: [
       LoginComponent // this component will be open through code instead of router
 ],
  bootstrap: [AppComponent]
})
export class AppModule { }
