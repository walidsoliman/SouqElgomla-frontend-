import { Component, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/Models/IProduct';
import { IproductOrderViewModels } from 'src/app/Models/iproduct-order-view-models';
import { ProductService } from 'src/app/Services/Product.service';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.scss']
})
export class OrderViewComponent implements OnInit {
  order : IproductOrderViewModels[]=[]
  product:IProduct []=[];
  quntity:number[]=[];
  totalPrice:number=0;
 arrayOfValues: Array<IproductOrderViewModels>=[]
  constructor(private route : ActivatedRoute,
    prdsev:ProductService,private sanitizer: DomSanitizer,
    private routt:Router) {
    const myArray = this.route.snapshot.queryParamMap.get('myArray');
    if (myArray === null) {
      this.arrayOfValues = new Array<IproductOrderViewModels>();
    }
     else {
      this.arrayOfValues = JSON.parse(myArray);
    }
    console.log(this.arrayOfValues)
    for (let i=0;i<this.arrayOfValues.length;i++)
    {
      prdsev.getProductByID(this.arrayOfValues[i].productID).subscribe({
          next:(res)=>{
            console.log("res data come")
            console.log(res.data);
            res.data.imageUrl = this.sanitizer.sanitize(SecurityContext.NONE, 
              this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, ' + res.data.image));
         this.product.push(res.data); 
        
        }
      })
      this.quntity.push(this.arrayOfValues[i].quantity);
    }
    this.quntity.reverse();
  
    console.log("view quntity")
    console.log(this.product);
    console.log(this.quntity)
   }

  ngOnInit(): void {
   
   
  }
  gotoHome() {
    this.routt.navigate([""]);
  }
  gotoOrder()
  {
    this.routt.navigate(["order/Orders"]);
  }
}
