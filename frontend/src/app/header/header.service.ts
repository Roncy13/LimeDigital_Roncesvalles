import { Injectable } from '@angular/core';
import { Service } from '../utitlities/constants';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class HeaderService extends Service {

  constructor(private _toastr: ToastrService,private _http: HttpClient) { 
    super(_toastr, _http);
  }

  signIn(email: string, password: string) {
    return this.post('login', { email, password} );
  }
}
