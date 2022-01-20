import { Component, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ICategory } from 'src/app/Models/ICategory';
import { CategoryService } from 'src/app/Services/Category.service';
import { ProductService } from 'src/app/Services/Product.service';

@Component({
  selector: 'app-AllCategories',
  templateUrl: './AllCategories.component.html',
  styleUrls: ['./AllCategories.component.scss']
})
export class AllCategoriesComponent implements OnInit {
  categoryList: ICategory[] = [];
  subscribtion: Subscription[] = [];

  constructor(private categoryService: CategoryService,
    private router: Router,
    private prodService: ProductService,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {
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
        console.log(this.categoryList)
        this.subscribtion.push(sub);
      }
    })
  }

    ShowProducts(catId:number){
      scroll(0,0);
      this.router.navigate(['/Product/products',catId]);
    }
}
