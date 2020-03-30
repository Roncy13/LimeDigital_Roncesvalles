import { Component, OnInit } from '@angular/core';
import { YesNo } from '../utitlities/constants';
import { HeaderService } from './header.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private headerSrv: HeaderService) { }

  ngOnInit() {
  }

  signIn() {
    YesNo.fire({
      title: 'Sign in',
      html:
        '<input class = "form-control" type = "text" id = "username" placeholder="Email">' +
        '<input class = "form-control mt-2" type = "password" id = "password" placeholder="Password">',
      icon: 'info'
    }).then(result => {
      if (result.value) {
        const username = (document.getElementById("username") as any).value,
          password = (document.getElementById("password") as any).value;

        this.checkCredentials(username, password);
      }
    });
  }

  checkCredentials(username: string, password: string) {
    const result = this.headerSrv.signIn(username, password).toPromise();

    result
      .then(row => console.log(row))
      .catch(this.headerSrv.checkError)
  }

}
