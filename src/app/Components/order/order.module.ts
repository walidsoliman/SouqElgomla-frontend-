import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import { RouterModule, Routes } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { CheckoutComponent } from './checkout/checkout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderNumberComponent } from './order-number/order-number.component';
import { UserAuthGuard } from 'src/app/guard/user-auth.guard';
import { OrderViewComponent } from './order-view/order-view.component';

const routes:Routes =[
  {path:'cart',component:CartComponent},
  {
    path:'checkout',component:CheckoutComponent
    ,canActivate: [UserAuthGuard]},
  {path:'OrderNumber',component:OrderNumberComponent,canActivate: [UserAuthGuard]},
  {path:'Orders', component:OrderDetailComponent,canActivate: [UserAuthGuard]},
  {path:'vieworder', component:OrderViewComponent,canActivate: [UserAuthGuard]}
]

@NgModule({
  declarations: [
    CartComponent,
    CheckoutComponent,
    OrderDetailComponent,
    OrderNumberComponent,
    OrderViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class OrderModule { }
