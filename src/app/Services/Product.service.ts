import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpResponseVM } from '../ViewModels/HttpResponseVM';
import { environment } from 'src/environments/environment';
import { IProduct } from '../Models/IProduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

constructor(private httpService:HttpClient) { }


getAllProducts():Observable<HttpResponseVM>{
  
  return this.httpService.get<HttpResponseVM>(`${environment.ApiURL}/Product`);

}
getProductByID(prodID:number):Observable<HttpResponseVM>{
  return this.httpService.get<HttpResponseVM>(`${environment.ApiURL}/Product/${prodID}`);
}

getProductsByCatID(catID:number):Observable<HttpResponseVM>{
  return this.httpService.get<HttpResponseVM>(`${environment.ApiURL}/Product/GetProdByCatID/${catID}`)
}

}
