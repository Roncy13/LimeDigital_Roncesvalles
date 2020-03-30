import { Component, OnInit } from '@angular/core';
import { IsLoggedIn } from '../utitlities/constants';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  showMenu = false;

  constructor() { }

  ngOnInit() {
    console.log(this.showMenu);
    this.showMenu = IsLoggedIn();
    console.log(this.showMenu);
  }

}
