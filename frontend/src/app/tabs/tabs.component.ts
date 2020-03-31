import { Component, OnInit } from '@angular/core';
import { IsLoggedIn } from '../utitlities/constants';
import { IndexSrvice } from '../pages/index/index.service';
import Swal from 'sweetalert2';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  showMenu = false;

  posts: [] =[];
  constructor(private service: IndexSrvice, private router: Router) {}

  ngOnInit() {
    this.showMenu = IsLoggedIn();
    if (this.showMenu) {
      const result = this.service.all().toPromise();

      Swal.showLoading();
      result
        .then(row => this.posts = row['data'])
        .finally(() => {Swal.close()});
    }
    
  }

}
