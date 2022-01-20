import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICategory } from '../Models/ICategory';
import { HttpResponseVM } from '../ViewModels/HttpResponseVM';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

constructor(private httpService:HttpClient) { }

getAllCategories():Observable<HttpResponseVM>{
  return this.httpService.get<HttpResponseVM>(`${environment.ApiURL}/Category`)
}
getCategoryByID(catID:number):Observable<HttpResponseVM>{
  return this.httpService.get<HttpResponseVM>(`${environment.ApiURL}/Category/${catID}`);
}

}
