import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertService } from 'src/app/Services/alert.service';
import { AuthServiceService } from 'src/app/Services/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registrationForm!: FormGroup;

  modalRef! : BsModalRef;

  @ViewChild('invalidCredentials', { static: true })
  invCredentials!: TemplateRef<any>;
  regError: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthServiceService,
    private modalService: BsModalService,
    private alertService: AlertService,
    private router: Router
  ) {
  }


  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/Category']);
    }
    this.registrationForm = this.fb.group({
     
        name: new FormControl(null, Validators.required),
        address: new FormControl(null, Validators.required),
        userName: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.required,Validators.email]),
        password: new FormControl(null, Validators.required)
     
    });
  }

  register() {

    this.authService
      .registerUser(this.registrationForm.value)
      .subscribe(
        res=>{
          console.log("reg token->"+res.token)
          localStorage.setItem("token", res.token);
          this.authService.isLoggedSubject.next(true);
          this.authService.prepareUserData();
          this.router.navigate([`/Category`]);
        },
        error =>{
          console.log("b "+JSON.stringify(error.error.message) )

          this.regError=error.error.error;
          
          if(this.regError == null) 
          this.regError= JSON.stringify(error.error.message);


          this.alertService.error(this.regError);
          this.openModal(this.invCredentials);
        }
        );
      

  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  
  hide(): void {
    this.modalRef.hide();
  }

}
