import { Component, OnInit } from '@angular/core';
import { YesNo } from '../utitlities/constants';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

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

      console.log(result);
      const username = (document.getElementById("username") as any).value,
        password = (document.getElementById("password") as any).value;

      console.log({ username, password });

    });
  }

}
