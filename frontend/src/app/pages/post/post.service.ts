import { Injectable } from '@angular/core';
import { Service } from '../../utitlities/constants';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService extends Service {

  constructor(private _toast: ToastrService, private _http: HttpClient) {
    super(_toast, _http);  
  }

  all() {
    return this.getDataWithParam('post');
  }

  create(payload) {
    return this.formData('post', payload);
  }

  update(payload, id) {
    return this.formData(`post/${id}`, payload);
  }

  destroy(id) {
    return this.delete(`post/${id}`);
  }
}
