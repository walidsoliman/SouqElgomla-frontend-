import { HttpClient, HttpHeaders } from '@angular/common/http';
import { jsDocComment } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICart } from '../Models/icart';
import { IProduct } from '../Models/IProduct';


@Injectable({
  providedIn: 'root'
})
export class ShowItemOnTheCartService {
  cart:IProduct[]=[]
  filterDate:IProduct[]=[];
  totalPrice:number=0;
  l:number=this.cart.length;
  private cartItemCount = new BehaviorSubject<number>(0);
  constructor(private httpService:HttpClient) { 
    if(localStorage.getItem("cart"))
    this.cart= JSON.parse(localStorage.getItem("cart") || '{}')
    this.cartItemCount.next(this.cart.length);
    
  }


  getLentgth()
  {
    return this.cartItemCount.asObservable();
  }
  deleteAllFromThecart()
  {
  
    this.cartItemCount.next(0);
    this.cart=[];
    localStorage.setItem("cart",JSON.stringify(this.cart))
  }
  getItemFromCart(){
    if(localStorage.getItem("cart"))
    return JSON.parse(localStorage.getItem("cart") || '{}')
    
  }
  deleteItemFromCart(pid:number,catId:number)
  {
     this.filterDate=JSON.parse(localStorage.getItem("cart") || '{}');
    localStorage.removeItem("cart");
    this.cart= this.filterDate.filter(item =>item.id !=pid)
    localStorage.setItem("cart",JSON.stringify(this.cart))
    this.cartItemCount.next(this.cart.length)

  }

  addToCart(p:IProduct)
  {
    if (this.checkIfInCart(p))
    {
   if (localStorage.getItem("cart"))
   {
     
     this.cart=JSON.parse(localStorage.getItem("cart") || '{}');
     localStorage.removeItem("cart");
     this.totalPrice +=p.price;
     this.cart.push(p);
     localStorage.setItem("cart",JSON.stringify(this.cart));
     this.cartItemCount.next(this.cart.length)
   }
     else{
    this.cart.push(p);
    this.totalPrice +=p.price;
    localStorage.setItem("cart",JSON.stringify(this.cart));
    this.cartItemCount.next(this.cart.length)
     }
    }
  
    }

    checkIfInCart(p:IProduct):boolean
    { 
      if ( !localStorage.getItem("cart"))
      localStorage.setItem("cart",JSON.stringify(this.cart));
      this.filterDate=JSON.parse(localStorage.getItem("cart") || '{}');
       for (let i of this.filterDate)
       {
         if (i.id==p.id)
         return false;
       }
       return true; 
    }

  
}
