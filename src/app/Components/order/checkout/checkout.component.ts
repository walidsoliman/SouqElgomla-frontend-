import { Component, OnInit, ViewChild, ElementRef, SecurityContext } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from 'src/app/Models/IProduct';
import { ShowItemOnTheCartService } from 'src/app/Services/show-item-on-the-cart.service';
import {render} from 'creditcardpayments/creditCardPayments'
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CheckoutService } from 'src/app/Services/checkout.service';

declare var paypal:any;
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  @ViewChild('paypal', { static: true }) paypalElement: ElementRef|any;
  product = {
    price: 777.77,
    description: 'used couch, decent condition',
    img: 'assets/couch.jpg'
  };
    myform =new  FormGroup({
      Name :new FormControl('',[Validators.required]),
      Street:new FormControl("null",[Validators.required]),
      City :new FormControl("null",[Validators.required]),
      Phone :new FormControl("null",[Validators.required])

    })
 
  showPaypal:boolean=false;
  showCash:boolean=false;
   Name:string = ""
   City:string="";
    Street:string="";
    Phone:number=0;
  paidFor:boolean = false;
  cart:IProduct[]=[];
  totalPrice:number=0;
  pesonalInfo:boolean=false;
  
 
  constructor(private cartSevice:ShowItemOnTheCartService,
    private router:Router, private sanitizer: DomSanitizer,private chekserv:CheckoutService
   ) {
  
      if(localStorage.getItem("Street"))
      {  
         this.pesonalInfo=true;
         this.City=localStorage.getItem("City") || '{}';
         this.Street=localStorage.getItem("Street") || '{}';
         this.Name=localStorage.getItem("Name")|| '{}';
         this.Phone= parseInt(localStorage.getItem("Mobile") || '{}');
      }
    this.cart =cartSevice.getItemFromCart()
    for (let i = 0; i < this.cart.length; i++) {
      this.cart[i].imageUrl = this.sanitizer.sanitize(SecurityContext.NONE, 
        this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, ' +  this.cart[i].image));
      }
   this.totalPrice= parseInt(localStorage.getItem("totalPrice") || '{}');
   }
   onSubmit()
   {

   }
   ngOnInit()
   {
 
    paypal
      .Buttons({
        createOrder: (data:any, actions:any) => {
          return actions.order.create({
            purchase_units: [
              {
                description: this.product.description,
                amount: {
                  currency_code: 'USD',
                  value: this.totalPrice
                }
              }
            ]
          });
        },
        onApprove: async (data:any, actions:any) => {
          const order = await actions.order.capture();
          this.paidFor = true;
          alert ("done");
          localStorage.setItem("paymentType","2");
          this.chekserv.addOrder();
          //this.router.navigate([""]);
          
        },  
        onError:(err:any)=> 
        {
          console.log(err);
        }
      })
      .render(this.paypalElement.nativeElement);
  }
  backToCart()
  {
    this.router.navigate(["order/cart"]);

  }
  
showpaypal()
{

  this.showPaypal=true
  this.showCash=false;

}
showcash()
{
  this.showPaypal=false
  this.showCash=true;
}

savePersonalInfo()
{
  alert(this.Name);
  this.chekserv.orderPersonalInfo(this.Name,this.City,this.Street,this.Phone)
  this.pesonalInfo=true;
    
}
ShowFormPersonalData(){
  this.pesonalInfo=false;
}
checkoutOder()
{
  localStorage.setItem("paymentType","1");
  this.chekserv.addOrder();
 
  
}

}
