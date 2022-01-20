import { Component, OnChanges, OnInit, SecurityContext, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ICart } from 'src/app/Models/icart';
import { IProduct } from 'src/app/Models/IProduct';
import { ShowItemOnTheCartService } from 'src/app/Services/show-item-on-the-cart.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnChanges {
  cartItem: ICart[] = []
  cart: IProduct[] = [];
  totalPrice: number = 0;
  quntity: number[] = [];
  qun: boolean = false;
  emptyCart: boolean = false;
  constructor(private router: Router,
    private cartSevice: ShowItemOnTheCartService,
    private sanitizer: DomSanitizer) {
      
     
    this.cart = cartSevice.getItemFromCart();
    if(this.cart.length >0)
    {
         this.emptyCart=true;  

    }
    else
    {
      this.emptyCart=false;
    }
    
    for (let i = 0; i < this.cart.length; i++) {
      this.cart[i].imageUrl = this.sanitizer.sanitize(SecurityContext.NONE, 
        this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, ' +  this.cart[i].image));
      this.quntity[i] = 1;
      this.totalPrice +=this.cart[i].price;
    }

    localStorage.setItem("totalPrice",this.totalPrice.toString())
    localStorage.setItem("quntity",JSON.stringify(this.quntity));
  }
  ngOnChanges(changes: SimpleChanges): void {

  }

  ngOnInit(): void {
    
  }
  gotoCheckOut() {
      this.router.navigate(["order/checkout"])
  }
  gotoHome() {
    this.router.navigate([""]);
  }
  removeItem(pid: number, catId: number) {
    this.cart= this.cartSevice.getItemFromCart();
    let prices: number[] = [];
    
    for (let i = 0; i < this.cart.length; i++) {
      if(this.cart[i].id==pid)
      {
       this.quntity.splice(i,1);
      
      }
    }
    
   
    this.totalPrice = 0;
    this.cartSevice.deleteItemFromCart(pid, catId)
    this.cart = this.cartSevice.getItemFromCart();
    for (let item of this.cart) {
      prices.push(item.price);

    }
   
    
    if(this.cart.length > 0)
    {
         this.emptyCart=true;  
    }
   else
   {
     this.emptyCart=false;
   }
    for (let i = 0; i < this.cart.length; i++) {
      this.cart[i].imageUrl = this.sanitizer.sanitize(SecurityContext.NONE, 
        this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, ' +  this.cart[i].image));
       
        
        
  }
  for (let i = 0; i < this.quntity.length; i++) {
    this.totalPrice += prices[i] * this.quntity[i];
  }
  localStorage.setItem("totalPrice",this.totalPrice.toString())
  localStorage.setItem("quntity",JSON.stringify(this.quntity));
  }
  calcPrice(price: number, id: number, qun: string, itemQuntity: number, index: number) {
    this.totalPrice = 0;
    localStorage.removeItem("totalPrice")
     
    let q = parseInt(qun);
    this.quntity[index] = q;
      if (itemQuntity < q) {
      alert("not Enough Quntity in our Repo")
      this.qun = false;
    }
    else {

      this.qun = true;
      this.cart = this.cartSevice.getItemFromCart();
      let prices: number[] = [];
      for (let item of this.cart) {
        prices.push(item.price);
      }
      for (let i = 0; i < this.cart.length; i++) {
          this.cart[i].imageUrl = this.sanitizer.sanitize(SecurityContext.NONE, 
            this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, ' +  this.cart[i].image));
        this.totalPrice += prices[i] * this.quntity[i];
      }
      localStorage.setItem("totalPrice",this.totalPrice.toString())
    }
    localStorage.setItem("quntity",JSON.stringify(this.quntity));
  }
}
