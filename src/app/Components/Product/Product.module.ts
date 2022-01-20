import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './Product.component';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './Products/Products.component';
import { BrowserModule } from '@angular/platform-browser';
import { ProductDetailsComponent } from './ProductDetails/ProductDetails.component';
import { RatingModule, RatingConfig } from 'ngx-bootstrap/rating';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { InnercardshadowDirective } from './directives/innercardshadow.directive';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PaginationModule } from 'ngx-bootstrap/pagination';


const routs: Routes = [
  { path: '', redirectTo: '/Product/products', pathMatch: 'full' },
  { path: 'products', component: ProductsComponent },
  { path: 'products/:catID', component: ProductsComponent },
  { path: 'prosuctdetails/:prodID', component: ProductDetailsComponent }
  
]
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routs),
    RatingModule,
    FormsModule,
    CarouselModule.forRoot(),
    TooltipModule.forRoot(),
    PaginationModule.forRoot(),
  ],
  declarations: [
    ProductComponent,
    ProductsComponent,
    ProductDetailsComponent,
    InnercardshadowDirective
  ]
})
export class ProductModule { }
