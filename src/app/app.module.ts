import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/Header/Header.component';
import { CategoryComponent } from './Components/Category/Category.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './Components/auth/login/login.component';
import { RegisterComponent } from './Components/auth/register/register.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertComponent } from './shared/alert/alert.component';
import { NgxModule } from './shared/ngx/ngx.module';
import { MaterialModule } from './shared/material/material.module';
import { FooterComponent } from './Components/footer/footer.component';
import { NavBarComponent } from './Components/NavBar/NavBar.component';
import { BrowserModule } from '@angular/platform-browser';
import { AddProductComponent } from './Components/add-product/add-product.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { DefaultBackgroundDirective } from './Directives/default-background.directive';
import { ProductCardDirective } from './Directives/product-card.directive'
import { JwtModule } from '@auth0/angular-jwt';
import { FilesModule } from './shared/files/files.module';
import {SafeHtmlPipe} from './Components/pipes/safeHtml.pipe'
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AllCategoriesComponent } from './Components/AllCategories/AllCategories.component';


export function tokenGet() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    AlertComponent,
    FooterComponent,
    NavBarComponent,
    AddProductComponent,
    ProductCardDirective,
    DefaultBackgroundDirective,
    SafeHtmlPipe,
    AllCategoriesComponent
  ],
    
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxModule,
    MaterialModule,
    FilesModule,
    CarouselModule.forRoot(),
    TooltipModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGet,
        allowedDomains : ["localhost:20998"],
        disallowedRoutes : []
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
