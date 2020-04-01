import { Component, OnInit, OnChanges, Inject } from '@angular/core';
import { YesNo, token, IsLoggedIn, DelayRequest, BUTTON, user } from '../utitlities/constants';
import { HeaderService } from './header.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public showMenu = false;
  constructor(
    private headerSrv: HeaderService, 
    private toastr: ToastrService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.showMenu = IsLoggedIn();
  }

  isLogin() {
    this.showMenu = IsLoggedIn();
  }

  signOut() {
    localStorage.removeItem(token);
    this.toastr.info("You have been logout...!");

    DelayRequest(() => location.replace("/"));
  }

  signIn() {
    YesNo.fire({
      title: 'Sign in',
      html:
        '<input class = "form-control" type = "text" id = "username" placeholder="Email *">' +
        '<input class = "form-control mt-2" type = "password" id = "password" placeholder="Password *">',
      icon: 'info'
    }).then(result => {
      if (result.value) {
        const username = (document.getElementById("username") as any).value,
          password = (document.getElementById("password") as any).value;
      
        if (username === "" || password === "") {
          this.signIn();
          this.toastr.warning("Missing username / password...!");
        } else {
          DelayRequest(() => this.checkCredentials(username, password));
        }
      }
    });
  }

  register() {
    this.dialog.open(RegisterDialog, {
      width: '50%',
      data: {}
    });
  }

  checkCredentials(username: string, password: string) {
    const result = this.headerSrv.signIn(username, password).toPromise();

    result
      .then(({ data, message }) => {
        this.toastr.success(message);
        localStorage.setItem(token, data.token);
        localStorage.setItem(user, JSON.stringify(data.user));
        //console.log(data.user);
        setTimeout(() =>location.replace('/post'),1000);
        
      })
      .catch(this.headerSrv.checkError)
      .finally(this.headerSrv.finally)
  }
}

@Component({
  selector: 'register',
  templateUrl: 'register.html',
})
export class RegisterDialog implements OnInit {

  form: FormGroup;
  saveButton = "Register";
  mismach = null;
  constructor(
    public dialogRef: MatDialogRef<RegisterDialog>,
    @Inject(MAT_DIALOG_DATA) public data,
    public fb: FormBuilder,
    private toast: ToastrService,
    private service: HeaderService) {
      
    }

  ngOnInit() {
    this.save = this.save.bind(this);
    this.setForm();
  }
  
  setForm() {
    this.form = this.fb.group({
      name: ["", Validators.required],
      password: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      c_password: ["", Validators.required],
    });

    this.form.valueChanges.subscribe(field => {
      if (field.password !== field.c_password) {
        this.mismach = true;
      } else {
        this.mismach = false;
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveForm() {
    const { value } = this.form;

    DelayRequest(() => this.save(value, this.data.form));
  }

  save(payload, form) {
    const result = this.service.register(payload).toPromise();
    
      result
        .then(({message}) => {
          this.onNoClick();
          this.toast.success("Your Registration has been successfull");
        })
        .catch(this.service.checkError)
        .finally(this.service.finally);
  }
}
