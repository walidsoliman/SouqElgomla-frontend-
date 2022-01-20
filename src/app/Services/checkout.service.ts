import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Iorder } from '../Models/iorder';
import { IProduct } from '../Models/IProduct';
import { OrderData } from '../Models/order-data';
import { OrderviewModels } from '../Models/orderview-models';
import { ShowItemOnTheCartService } from './show-item-on-the-cart.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  
  cart:IProduct[]=[]
  Quntity:number[]=[];
  orderviewModels: OrderviewModels[]=[]
  constructor(private http: HttpClient,private router:Router,
    private cartSevice:ShowItemOnTheCartService) {
 
    
  }

  orderPersonalInfo(Name:string,City:string,Street:string,mobile:number){
    localStorage.setItem("Street",Name);
    localStorage.setItem("City",City);
    localStorage.setItem("Name",Name);
    localStorage.setItem("Mobile",mobile.toString());
    
    
  }
  addOrder()//:Observable<Iorder>
  {
    this.cart=JSON.parse(localStorage.getItem("cart") || '{}');
    alert(JSON.stringify(this.cart))
    
    this.Quntity=JSON.parse(localStorage.getItem("quntity") || '{}');
     for (let i=0 ;i<this.cart.length ;i++)
     {
       this.orderviewModels.push({productID:this.cart[i].id,quantity: this.Quntity[i]})
     }
   let Order:Iorder={name:localStorage.getItem("Name") || ''.toString(),
     address:localStorage.getItem('City')||'' +'   '+localStorage.getItem('Street')||'',
     phone:parseInt(localStorage.getItem('Mobile')||''),
     payment:parseInt(localStorage.getItem("paymentType") || '{}'),
     orderviewModels :this.orderviewModels}
      this.orderviewModels=[];
       console.log(Order);
      const httpOptions={
      headers:new HttpHeaders({
        'content-type': 'application/JSON'
      })
    }
    //this.router.navigate(['order/OrderNumber'])
      this.http.post<any>(`${environment.ApiURL}/Order/CheckOut` ,JSON.stringify(Order),httpOptions)
      .subscribe(
        res=>{
          console.log(res);
          localStorage.setItem("orderNumber",res)
          this.cartSevice.deleteAllFromThecart();
          this.router.navigate(['order/OrderNumber'])
          return res;
        },
        error=>
        {
          console.log(error);
        }
        
      );
  }

  gitOrder(): Observable<OrderData[]> {
    
    return this.http.get<OrderData[]>(`${environment.ApiURL}/Order/GetOrder`);
  
}
}
