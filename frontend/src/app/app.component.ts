import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from '../environments/environment';
import { IsLoggedIn } from './utitlities/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  show = false;

  constuctor() {
    this.show = !IsLoggedIn();
  }
}
