import { Injectable } from '@angular/core';
import { Service } from '../../utitlities/constants';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IndexSrvice {

  constructor(private _http: HttpClient) {
  }

  findById(id) {
    return this._http.get(`${environment.url}/public/post/${id}`);
  }

  all() {
    return this._http.get(`${environment.url}/public/post`);
  }
}
