import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './Components/add-product/add-product.component';
import { AllCategoriesComponent } from './Components/AllCategories/AllCategories.component';
import { LoginComponent } from './Components/auth/login/login.component';
import { RegisterComponent } from './Components/auth/register/register.component';
import { CategoryComponent } from './Components/Category/Category.component';
import { CategoryIDComponent } from './Components/CategoryID/CategoryID.component';
import { NotFoundComponent } from './Components/NotFound/NotFound.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { SupplierAuthGuard } from './guard/supplier-auth.guard';
import { UserAuthGuard } from './guard/user-auth.guard';
import { ProfileResolverService } from './resolver/profile-resolver.service';
// '/auth/login'
const routes: Routes = [
  {path:'',redirectTo:'/Category',pathMatch:'full'},
  {path:'Category',
  component:CategoryComponent,
  //canActivate: [UserAuthGuard]
  },
  {path:'AllCategories',
  component:AllCategoriesComponent,
  //canActivate: [UserAuthGuard]
  },
  {
    path: 'Product',
    loadChildren: () => import('src/app/Components/Product/Product.module')
      .then(module => module.ProductModule),
      //canActivate: [UserAuthGuard]
  },

  {path:'Category/:CateID',
  component:CategoryIDComponent,
  canActivate: [UserAuthGuard]
},

  {
    path: 'order', 
    loadChildren: () => import('src/app/Components/order/order.module')
                        .then(m => m.OrderModule),
    canActivate: [UserAuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    resolve : {
      profile : ProfileResolverService
    },

    canActivate: [UserAuthGuard]
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      }
    ]
  },
  {path:'**',component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
