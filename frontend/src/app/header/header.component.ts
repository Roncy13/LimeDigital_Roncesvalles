import { Component, OnInit, OnChanges } from '@angular/core';
import { YesNo, token, IsLoggedIn, DelayRequest } from '../utitlities/constants';
import { HeaderService } from './header.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

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
    private router: Router
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

  checkCredentials(username: string, password: string) {
    const result = this.headerSrv.signIn(username, password).toPromise();

    result
      .then(({ data, message }) => {
        this.toastr.success(message);
        localStorage.setItem(token, data);
        this.router.navigate(["post"]);
      })
      .catch(this.headerSrv.checkError)
      .finally(this.headerSrv.finally)
  }

}
