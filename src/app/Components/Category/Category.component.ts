import { Component, OnDestroy, OnInit ,SecurityContext } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ICategory } from 'src/app/Models/ICategory';
import { IProduct } from 'src/app/Models/IProduct';
import { CategoryService } from 'src/app/Services/Category.service';
import { ProductService } from 'src/app/Services/Product.service';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-Category',
  templateUrl: './Category.component.html',
  styleUrls: ['./Category.component.scss']
})

export class CategoryComponent implements OnInit, OnDestroy {
  categoryList: ICategory[] = [];
  subscribtion: Subscription[] = [];
  topCategory : ICategory[] = [];
  slides: {image: string; text?: string}[] = [
    {image: 'assets/slid1.jpeg'},
    {image: 'assets/1168px_x_384px-2-(1).jpg'},
    {image: 'assets/1168px_x_384px-2.jpg'},
  ];
  noWrapSlides = false;
  showIndicator = true;
  
  constructor(private categoryService: CategoryService,
              private router : Router,
              private prodService : ProductService,
              private sanitizer: DomSanitizer) {
                
    let sub = this.categoryService.getAllCategories().subscribe({
      next: (resp) => {
        console.log(resp.data);
        this.categoryList = resp.data;
        for (let index = 0; index < this.categoryList.length; index++) {
          this.categoryList[index].imgUrl = this.sanitizer.sanitize(SecurityContext.NONE, 
            this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, ' + this.categoryList[index].image));
          
        }
      },
      complete:()=>{
        this.subscribtion.push(sub);

        console.log(this.categoryList)
        for (let index = 0; index < this.categoryList.length; index++) {
          let sub2 = this.prodService.getProductsByCatID(this.categoryList[index].id).subscribe({
            next:(respon) =>{
              let products : IProduct[] = respon.data;
              for (let index = 0; index < products.length; index++) {
                products[index].imageUrl = this.sanitizer.sanitize(SecurityContext.NONE, 
                  this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, ' + products[index].image));
              }

              this.categoryList[index].products = products;
              
              //To make sure that number of products in each category suitable to shown in home
              this.categoryList = this.categoryList.filter(item => item.products.length>=3);

              if(this.categoryList[index].products.length>3){
                this.categoryList[index].products = this.categoryList[index].products.slice(0,3)
              }
            },
            complete:()=>{
              this.subscribtion.push(sub2);
              
            }
          });
        }
        this.topCategory = this.categoryList.slice(2,5);
        console.log(this.topCategory);
      }
    });

   }

  ngOnDestroy(): void {
    for (const iterator of this.subscribtion) {
      iterator.unsubscribe();
    }
  }

  ngOnInit() {
    
  }

  ShowProducts(catId:number){
    scroll(0,0);
    this.router.navigate(['/Product/products',catId]);
  }

  ProdDetails(prodID:number){
    scroll(0,0);
    this.router.navigate(['/Product/prosuctdetails', prodID]);

  }

  ShowCategories(){
    scroll(0,0);
    this.router.navigate(['/AllCategories']);
  }
}
