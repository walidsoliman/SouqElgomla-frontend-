import { Component, OnDestroy, OnInit, SecurityContext } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProduct } from 'src/app/Models/IProduct';
import { CategoryService } from 'src/app/Services/Category.service';
import { ProductService } from 'src/app/Services/Product.service';
import { ICart } from 'src/app/Models/icart';
import { ShowItemOnTheCartService } from 'src/app/Services/show-item-on-the-cart.service';
import { ICategory } from 'src/app/Models/ICategory';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-Products',
  templateUrl: './Products.component.html',
  styleUrls: ['./Products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  initProdList: IProduct[] = [];   //return data from Api
  prodList: IProduct[] = [];       //data used in html
  PicksProduct: IProduct[] = [];
  subscription: Subscription[] = [];

  catID: number = 0;
  //for input values
  maxPriceInput: number = 0;
  minPriceInput: number = 1000;

  //for selected price
  maxPrice: number = 0;
  minPrice: number = 0;

  //selected rate
  Rate: number = 0;
  NumberOfProducts: number = 0;
  category: ICategory = {} as ICategory;
  CategoryName: string = "";

  //boolean value to switch between show and hide product info & add to cart buttons
  IsShowon: boolean = false;
  constructor(private prodService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private CategoryService: CategoryService,
    private cartServ: ShowItemOnTheCartService,
    private sanitizer: DomSanitizer) {
  }

  ngOnDestroy(): void {
    for (const iterator of this.subscription) {
      iterator.unsubscribe()
    }
  }

  ngOnInit() {
    this.route.paramMap.subscribe((parms) => {
      this.catID = Number(parms.get("catID"));
      let sub2 = this.prodService.getProductsByCatID(this.catID).subscribe({
        next: (response) => {
          this.initProdList = response.data

          for (let index = 0; index < this.initProdList.length; index++) {
            this.initProdList[index].imageUrl = this.sanitizer.sanitize(SecurityContext.NONE,
              this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, ' + this.initProdList[index].image));
          }

          this.prodList = this.initProdList;
          console.log(this.prodList);
          this.NumberOfProducts = this.prodList.length;
          if (this.prodList.length == 0) {
            this.minPriceInput = 0;
            this.minPrice = this.minPriceInput;
          }
        },
        complete: () => {
          this.subscription.push(sub2);
          this.prodList.forEach(item => {
            if (item.price > this.maxPriceInput) {
              this.maxPriceInput = item.price;
            }
            if (item.price < this.minPriceInput) {
              this.minPriceInput = item.price;
            }
          });

          this.minPrice = this.minPriceInput;
          this.maxPrice = this.maxPriceInput;

        }
      });

      let sub3 = this.prodService.getAllProducts().subscribe({
        next: (result) => {
          this.PicksProduct = result.data;
          this.PicksProduct = this.PicksProduct.filter(prod => prod.categoryId != this.catID);
          if (this.PicksProduct.length > 6) {
            this.PicksProduct = this.PicksProduct.slice(0, 6);
          }
        },
        complete: () => {
          this.subscription.push(sub3);
        }
      });
    });

    let sub4 = this.CategoryService.getCategoryByID(this.catID).subscribe({
      next: (resp) => {
        this.category = resp.data
        this.CategoryName = this.category.name;
        this.category.imgUrl = this.sanitizer.sanitize(SecurityContext.NONE,
          this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, ' + this.category.image));
      },
      complete: () => {
        this.subscription.push(sub4);
      }
    })
  }

  AddToCart(prd: IProduct) {
    console.log(prd);
    this.cartServ.addToCart(prd);
  }

  prodDetails(prodID: number) {
    this.router.navigate(['/Product/prosuctdetails', prodID]);
  }

  Apply(minPrice: string, maxPrice: string) {
    this.minPrice = Number(minPrice);
    this.maxPrice = Number(maxPrice);
    this.prodList = this.initProdList.filter(item =>
      item.price >= this.minPrice && item.price <= this.maxPrice
      && item.rate >= this.Rate);
    this.NumberOfProducts = this.prodList.length;
  }

  FilterByRate(rate: number) {
    this.Rate = rate;
    this.prodList = this.initProdList;
    this.prodList = this.prodList.filter(item =>
      item.rate >= rate
      && item.price >= this.minPrice && item.price <= this.maxPrice);
    this.NumberOfProducts = this.prodList.length;
  }

  orderByPrice(selectValue: string) {
    console.log(+selectValue);
    if (+selectValue == 1) {
      this.prodList.sort((a, b) => {
        return a.price - b.price;
      });
    } else if (+selectValue == 2) {
      this.prodList.sort((a, b) => {
        return b.price - a.price;
      });
    }
  }

  showButtons() {
    this.IsShowon = !this.IsShowon;
  }
  HideButtons() {
    this.IsShowon = !this.IsShowon;
  }
}
