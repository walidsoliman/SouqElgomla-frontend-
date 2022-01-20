import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory } from 'src/app/Models/ICategory';
import { IProduct } from 'src/app/Models/IProduct';
import { AuthServiceService } from 'src/app/Services/auth-service.service';
import { CategoryService } from 'src/app/Services/Category.service';
import { ShowItemOnTheCartService } from 'src/app/Services/show-item-on-the-cart.service';

@Component({
  selector: 'app-NavBar',
  templateUrl: './NavBar.component.html',
  styleUrls: ['./NavBar.component.scss']
})
export class NavBarComponent implements OnInit {

  categories:ICategory[] = [];
  selectedCategory: number = 0;
  isLogged : boolean = false;
  cart:IProduct[]=[]
  NumOfItemInTheCart:number=0;
  constructor(private activatedRouter:ActivatedRoute,
    private route:Router,  
    public authService: AuthServiceService,
    private categoryService: CategoryService,
    private cartSevice: ShowItemOnTheCartService) {
  


    }

  ngOnInit() {
  
    this.categoryService.getAllCategories().subscribe({
      next:(result)=>{
        this.categories = result.data;
      }
    });
 
    this.isLogged = this.authService.isLoggedIn();
    // this.cartSevice.getItemFromCart().length.subscribe({
    //   next:()=>{
    //     alert("jgfgdfjioj")
    //     this.NumOfItemInTheCart= this.cartSevice.getItemFromCart().length;
    //   }
    // })

    
       this.cartSevice.getLentgth().subscribe({
       next:(l)=>{
          
        
        this.NumOfItemInTheCart = l;
       },
       error:()=>
       {
         alert("vjkbvknvlf");
       }
       });

    this.authService.isLoggedInSubject().subscribe(
      {
        next:(logState)=>{
            this.isLogged=logState;
        }
      }
    );
    // this.isLogged = this.authService.isLoggedIn();
  }


  CategoryPage(ID:number)
  {
    //this.route.navigate
  }
  ShowCart()
  {
    this.route.navigate(["order/cart"]);
  }
  logout()
  {
    this.authService.userLogout()
  }

  ShowCategory(catId:number){
    this.route.navigate(['/Product/products',catId]);
  }
}
