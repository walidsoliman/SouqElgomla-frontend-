import { Component, OnDestroy, OnInit,SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProduct } from 'src/app/Models/IProduct';
import { ProductService } from 'src/app/Services/Product.service';
import { ShowItemOnTheCartService } from 'src/app/Services/show-item-on-the-cart.service';

@Component({
  selector: 'app-ProductDetails',
  templateUrl: './ProductDetails.component.html',
  styleUrls: ['./ProductDetails.component.scss']
})
export class ProductDetailsComponent implements OnInit,OnDestroy {

  prodId: number = 0;
  product: IProduct = {} as IProduct;
  subscription: Subscription[] = [];
  max :number = 5;
  itemsPerSlide = 3;
  ReltedProdList : IProduct[] = [];
  image : string = "";
  IsThereRelated : boolean = false;
  constructor(private activeRouter: ActivatedRoute,
    private prodService: ProductService,
    private router: Router,
    private cartServ:ShowItemOnTheCartService,
    private sanitizer: DomSanitizer) { }

  ngOnDestroy(): void {
    for (const iterator of this.subscription) {
      iterator.unsubscribe();
    }
  }

  ngOnInit() {
    this.activeRouter.paramMap.subscribe((params) => {
      this.prodId = Number(params.get('prodID'));
      let sub = this.prodService.getProductByID(this.prodId).subscribe({
        next: (response) => {
          this.product = response.data;
          this.product.imageUrl = this.sanitizer.sanitize(SecurityContext.NONE, 
            this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, ' + this.product.image));
          console.log(this.product);
        },
        complete: ()=>{
          this.subscription.push(sub);
          let sub2 = this.prodService.getProductsByCatID(this.product.categoryId).subscribe({
            next:(resp)=>{
              this.ReltedProdList = resp.data;
              this.ReltedProdList = this.ReltedProdList.filter(prod => prod.id != this.product.id);

              for (let index = 0; index < this.ReltedProdList.length; index++) {
                this.ReltedProdList[index].imageUrl = this.sanitizer.sanitize(SecurityContext.NONE, 
                  this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, ' + this.ReltedProdList[index].image));
                
              }

              if(this.ReltedProdList.length>5){
                this.ReltedProdList = this.ReltedProdList.slice(0,5);
              }
              if(this.ReltedProdList.length == 0 ){
                this.IsThereRelated = true;
              }
            }
          });
        }
      })
    });


  }
  
  ShowprodDetails(prodID: number) {
    scroll(0,0);
    this.router.navigate(['/Product/prosuctdetails', prodID]);
  }
  AddToCart(prd:IProduct){
   
    console.log("product from component");
    console.log(prd)
    this.cartServ.addToCart(prd);
  }
}

