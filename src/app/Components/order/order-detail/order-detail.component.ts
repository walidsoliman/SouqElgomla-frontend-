import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { IproductOrderViewModels } from 'src/app/Models/iproduct-order-view-models';
import { OrderData } from 'src/app/Models/order-data';
import { OrderviewModels } from 'src/app/Models/orderview-models';
import { CheckoutService } from 'src/app/Services/checkout.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
orders:OrderData[]=[]
  constructor( private checkoutServ :CheckoutService,
    private router:Router) { 
 
    
     
  }

  ngOnInit(): void {
    this.checkoutServ.gitOrder().subscribe( {
      next:(res)=>{
        //console.log(res)
        this.orders =res;
        
        console.log("helooo");
        console.log(this.orders[0].name)
        console.log(this.orders)
      }
     })
  
  }
  viewOrder ( order:IproductOrderViewModels [])
  {
    const queryParams: any = {}
    queryParams.myArray = JSON.stringify(order)
    const navigationExtras: NavigationExtras = {
      queryParams
   }
    this.router.navigate(['order/vieworder'], navigationExtras );
  }
  gotoHome() {
    this.router.navigate([""]);
  }
}
