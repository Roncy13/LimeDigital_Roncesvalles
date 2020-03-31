import { Injectable } from '@angular/core';
import { Service } from '../../utitlities/constants';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MediaService extends Service {

  constructor(private _toast: ToastrService, private _http: HttpClient) {
    super(_toast, _http);  
  }

  all() {
    return this.getDataWithParam('media');
  }

  create(payload) {
    return this.post('media', payload);
  }

  update(payload, id) {
    return this.put(`media/${id}`, payload);
  }

  destroy(id) {
    return this.delete(`media/${id}`);
  }
}
