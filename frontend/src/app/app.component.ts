import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';

  ngOnInit() {
    axios.get(`${environment.url}/api/post/sample`).then(row => console.log(row));
  }
}
