import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertService } from 'src/app/Services/alert.service';
import { AuthServiceService } from 'src/app/Services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
// we will use reactive forms
authCredentialsDto! : FormGroup;
modalRef! : BsModalRef;
showPass = true;
  @ViewChild('invalidCredentials', { static: true })
  invCredentials!: TemplateRef<any>;

constructor(
  private authService: AuthServiceService,
  private router: Router,
  //private cartService: CartService,
  private fb: FormBuilder,
  private alertService: AlertService,
  private modalService: BsModalService,
) {
  if (this.authService.isLoggedIn()) {
    this.router.navigate(['/Category']);
  }
}

userLogin() {
  this.authService.login(this.authCredentialsDto.value).subscribe(
    res => {
      console.log(res);
      localStorage.setItem("token", res.token);
      this.authService.isLoggedSubject.next(true);
      this.authService.getCurrentUser().subscribe(
        re =>{
          // alert(JSON.stringify(re));
        }
      )
      this.authService.prepareUserData();
      this.router.navigate([`/Category`]);
    },
    error => {
      console.log(error);

      this.alertService.error(error);
      this.openModal(this.invCredentials);
    }
  );
}

ngOnInit() {
  this.authCredentialsDto = this.fb.group({
    email: new FormControl(null, [Validators.required,Validators.email]),
    password: new FormControl(null, Validators.required)
  });
}

openModal(template: TemplateRef<any>) {
  this.modalRef = this.modalService.show(template);
}

hide(): void {
  this.modalRef.hide();
}

}
