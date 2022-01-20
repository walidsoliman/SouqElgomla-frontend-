import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Profile } from 'src/app/Models/profile';
import { AuthServiceService } from 'src/app/Services/auth-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  
  profile!: Profile ;
  modalRef!: BsModalRef;
  public uploader: FileUploader = new FileUploader({});
  formData: FormData = new FormData();
  selectedFile!: string ;

  nameForm!: FormGroup;
  emailForm!: FormGroup;
  addressForm!: FormGroup;
  usernameForm!: FormGroup;

  defaultImage : string ="assets/default.png"

  constructor(private fb: FormBuilder,
              private authService: AuthServiceService,
              private modalService: BsModalService,
              private route: ActivatedRoute) {
                
    if (route.snapshot.data['profile']) {
      this.profile = route.snapshot.data['profile'];
      this.updateObject.name = this.profile.name;
      this.updateObject.email = this.profile.email;
      this.updateObject.address = this.profile.address;
      this.updateObject.userName = this.profile.userName;
    }

  
  }

  updateObject = {
    name: "",
    email: "",
    address: "",
    userName: "",
  };

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  updateProfile() {
    this.authService.getCurrentUser().subscribe(resUser => {
      if(resUser.email == this.updateObject.email)
      {
        this.authService.updateProfile(this.updateObject).subscribe(result => {
          this.profile = result;
          console.log("updateProfile: "+JSON.stringify(result) )
          this.authService.username = `${result.name}`;
        })
      }
      else
      {
        this.authService.updateProfile(this.updateObject).subscribe(result => {
          this.profile = result;
          console.log("updateProfile: "+JSON.stringify(result) )
          this.authService.userLogout();
        })
      }
    });
    
  }


  hide(): void {
    this.modalRef.hide();
  }

  ngOnInit() 
  {
    this.nameForm = this.fb.group({
      name : new FormControl(null, Validators.required),
    })

    this.emailForm = this.fb.group({
      email: new FormControl(null, [Validators.required,Validators.email]),
    })

    this.addressForm = this.fb.group({
      address : new FormControl(null,Validators.required),
    })

    this.usernameForm = this.fb.group({
      username : new FormControl(null,Validators.required),
    })
    
  }

  onFileSelect(event: any) {
    if ( event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0] as File;

      const reader = new FileReader();
      reader.onload = e => this.profile.image = reader.result ;

        reader.readAsDataURL(file);

      this.selectedFile = file.name;
      this.formData.set('image', file);
    }
    else
    {
      
    }
  }

  uploadingNewPicture() {

    if(this.formData.get('image') != null)
    {
      this.authService.addProfileImage(this.formData)
      .subscribe(res => {
        console.log(res);
        this.profile = res;
        console.log("changingExistPicture: "+JSON.stringify(res))
        this.formData.delete('image');
        this.selectedFile = "";
        alert('profile image changed successfully');
      });
    }
    else
    {
      alert('No profile image selected');

    }
 
  }

  changingExistPicture() {
    alert(this.formData.get('image') );

    if(this.formData.get('image') != null)
    {
      this.authService.addProfileImage(this.formData)
      .subscribe(res => {
        console.log(res);
        this.profile = res;
        console.log("changingExistPicture: "+JSON.stringify(res))
        this.formData.delete('image');
        this.selectedFile = "";
        alert('profile image changed successfully');
      });
    }
    else
    {
      alert('No profile image selected');

    }
 
  }
}
