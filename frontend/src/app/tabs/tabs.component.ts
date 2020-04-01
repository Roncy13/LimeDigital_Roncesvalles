import { Component, OnInit, OnChanges } from '@angular/core';
import { IsLoggedIn, user } from '../utitlities/constants';
import { IndexSrvice } from '../pages/index/index.service';
import Swal from 'sweetalert2';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit, OnChanges {
  showMenu = false;
  name = null;
  posts: [] =[];
  constructor(private service: IndexSrvice, private router: Router) {
    this.router.events.subscribe((val) => {
      // see also 
      this.checkStatus();
    });
  }

  ngOnInit() {
    this.checkStatus();
  }

  setUsername() {
    //this.name = JSON.parse(localStorage.getItem(user)).name as any || null;
    const info = JSON.parse(localStorage.getItem(user));

    if (info) {
      this.name = info.name || null;
    } else {
      this.name = null;
    }
  }

  checkStatus() {
    this.showMenu = IsLoggedIn();
    if (this.showMenu) {
      const result = this.service.all().toPromise();

      Swal.showLoading();
      result
        .then(row => this.posts = row['data'])
        .finally(() => {Swal.close()});
    }
    this.setUsername();
  }

  ngOnChanges() {
    this.checkStatus();
  }
}
