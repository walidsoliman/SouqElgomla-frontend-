import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ICart } from '../Models/icart';
import { ItemInCart } from '../Models/item-in-cart';
import { Profile } from '../Models/profile';
import { User } from '../Models/user';
import { UserData } from '../Models/user-data';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  public isLoggedSubject : BehaviorSubject<boolean>;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) 
  {
    if(this.isLoggedIn())
    {
      this.isLoggedSubject = new BehaviorSubject<boolean>(true);
    }
    else
    {
      this.username ="Account";
      this.isLoggedSubject = new BehaviorSubject<boolean>(false);

    }

  }

  _registerUrl = `http://localhost:20998/User/signup`;
  _loginUrl = `http://localhost:20998/User/login`;
  _userUrl = `http://localhost:20998/User/GetUser`;
  private _userEdit = `http://localhost:20998/User/EditPatch`;

  private imageChangeUrl = `http://localhost:20998/profile/userprofile/changeprofileimage`;
  private newImageUrl = `http://localhost:20998/User/AddUserImage`;
  private contactUrl = `http://localhost:3000/contacts/new-mail`;
  public username: string | undefined;
  public cart: ICart | undefined;
  public cartItem: ItemInCart | undefined;
  public profile: Profile | undefined;
  public currentUser: User ={
    role: '',
    id: 0,
    email: '',
    password: '',
    profileId: 0
  };

  registerUser(registrationInfo :any): Observable<any> {
    return this.http.post<void>(this._registerUrl, registrationInfo);
  }

  prepareUserData() {
    if (this.isLoggedIn()) {
      this.getCurrentUser().subscribe(resUser => {
        this.currentUser = resUser;
        this.username = resUser.name;
      });
      // this.pUserData().subscribe(uData => {
      //   this.profile = uData.profile;
      //   this.username = `${uData.profile.name}`;
      // });
    }
  }

  refreshInfo() {
    // if (this.isLoggedIn()) {
    //   this.pUserData().subscribe(uData => {
    //     this.profile = uData.profile;
    //     this.cart = uData.cart;
    //     this.cartItem = uData.cartItem;
    //   });
    // }
  }

  // pUserData(): Observable<UserData> {
    
  //     return this.http.get<UserData>(this._userDataURL);
    
  // }

  messageContact(messageForm: any): Observable<void> {

    return this.http.post<void>(this.contactUrl, messageForm);
    
  }

  updateProfile(updateForm :any): Observable<Profile> {
    
      return this.http.put<Profile>(
        `${this._userEdit}`,
        updateForm
      );
   
  }

  getCurrentUser(): Observable<any> {
    
      return this.http.get<any>(`${this._userUrl}`);
    
  }

  changeProfileImage(imageForm :any): Observable<Profile> {
   
      return this.http.patch<Profile>(this.imageChangeUrl, imageForm);
    
  }

  addProfileImage(imageForm :any): Observable<Profile> {
   
      return this.http.post<Profile>(this.newImageUrl, imageForm);
    
  }



  login(user: any): Observable<any> {
  
      return this.http.post<any>(this._loginUrl, user);
  
  }


  userLogout() {
    this.router.navigate(["/auth/login"]);
    this.isLoggedSubject.next(false);
    this.username ="Account";
    return localStorage.removeItem("token");
  }

  isLoggedIn() {
    return !!localStorage.getItem("token");
  }

  isLoggedInSubject() : Observable<boolean>
  {
    return this.isLoggedSubject.asObservable();
  }

  getToken() {
    return localStorage.getItem("token");
  }
}
