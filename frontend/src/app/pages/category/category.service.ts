import { Injectable } from '@angular/core';
import { Service } from '../../utitlities/constants';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends Service {

  constructor(private _toast: ToastrService, private _http: HttpClient) {
    super(_toast, _http);  
  }

  all() {
    return this.getDataWithParam('category');
  }

  create(payload) {
    return this.post('category', payload);
  }
}
