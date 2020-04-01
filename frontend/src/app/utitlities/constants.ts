import Swal from 'sweetalert2';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { pickBy, identity, isEmpty, first } from "lodash";
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";


export const token = 'token';
export const user = 'user';

export const YesNo = Swal.mixin({
  confirmButtonText: 'Ok',
  cancelButtonText: 'Cancel',
  showCancelButton: true,
  confirmButtonColor: "#5cb85c",
  cancelButtonColor: "#d9534f"
});

export enum BUTTON {
  Add = 'Add',
  Edit = 'Edit',
}

export const DelayRequest = (fn : Function) => 
  setTimeout(() => { 
    Swal.showLoading();
    fn() 
  }, 1000);

export const IsLoggedIn = () => isEmpty(localStorage.getItem(token));

@Injectable({
  providedIn: "root"
})
export class Service {
  public url: string = environment.url;

  constructor(private toast: ToastrService, private http: HttpClient) {
    this.checkError = this.checkError.bind(this);
  }

  getRealValues(params) {
    return pickBy(params, identity);
  }

  public getDataWithParam<T>(route: string, params = null): Observable<any> {
    params = this.getRealValues(params);
    
    const url = this.createCompleteRoute(
      route,
      this.url
    );

    return this.http.get<T[]>(`${url}`, {
      params,
      ...this.generateHeaders()
    });
  }

  public getDataById<T>(route: string): Observable<T> {
    return this.http.get<T>(
      this.createCompleteRoute(`${route}`, this.url),
      this.generateHeaders()
    );
  }

  getToken() : Object {
    return { Authorization: `Bearer ${localStorage.getItem(token)}` };
  }

  public post<T>(route: string, body) {
    body = { ...body, ...this.getToken() };

    return this.http.post<T>(
      this.createCompleteRoute(route, this.url),
      body,
      this.generateHeaders()
    );
  }

  public formData<T>(route: string, body) {
    return this.http.post<any>(
      this.createCompleteRoute(route, this.url),
      body,
      this.generateHeaders()
    );
  }

  public put<T>(route: string, body) {
    body = { ...body, ...this.getToken() };

    return this.http.put<T>(
      this.createCompleteRoute(route, this.url),
      body,
      this.generateHeaders()
    );
  }
  public finally() {
    Swal.close();
  }

  public patch<T>(route: string, body) {
    body = { ...body, ...this.getToken() };

    return this.http.patch<T>(
      this.createCompleteRoute(route, this.url),
      body,
      this.generateHeaders()
    );
  }

  public delete<T>(route: string) {
    const token = this.getToken();
    const options = {
      ...this.generateHeaders(),
      body: token
    };

    return this.http.delete<T>(
      this.createCompleteRoute(route, this.url),
      options
    );
  }

  private createCompleteRoute(route: string, resourceUrl: string) {
    return `${resourceUrl}/${route}`;
  }

  private generateHeadersFD() {
    return {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${localStorage.getItem(token)}`)
        .set('Content-Type', 'application/x-www-form-urlencoded')
    };
  }

  private generateHeaders() {
    return {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${localStorage.getItem(token)}`)
    };
  }

  checkError(err, message = "") {
    if (err.status === 401) {
      this.toast.warning(`Your Session has been Expired...!`);
      localStorage.clear();

      setTimeout(() => location.replace("/"), 1500);
    }  else if (err.status === 404) {
      const { message = "" } = err.error; 

      this.toast.error(message);
    } else if (err.status === 422) {
      const { message = "", errors = {} } = err.error; 

      const errorKeys = Object.keys(errors),
        firstErrKey = first(errorKeys),
        firtErrMsg = first(errors[firstErrKey])

      console.log(firstErrKey);

      this.toast.error(firtErrMsg);
      this.toast.error(message);
    } else {
      this.toast.error("Cannot Process Request, Please Email JamesRoncy13@gmail.com for the incident happpend...!");
    }
  }

}

export class CheckError {
  constructor(private toast: ToastrService) {}

  checkError(err, message = "") {
    if (err.status === 400 && err.error.message.length > 0) {
      const { message } = err.error,
        { constraints, property, children } = message[0];

      let errorMsg;

      if (constraints !== undefined) {
        errorMsg = constraints[Object.keys(constraints)[0]];
        //this.toast.warning(errorMsg.replace(property, startCase(property)));
      } else if (children !== undefined) {
        const { constraints: childrenConstraints } = children[0];
        errorMsg = childrenConstraints[Object.keys(childrenConstraints)[0]];
        //this.toast.warning(upperFirst(errorMsg));
      }
    } else if (err.status === 401) {
      this.toast.warning(`Your Session has been Expired...!`);
      //REMOVE_STORAGE();

      setTimeout(() => location.replace("/"), 1500);
    } else {
      if (message === "") {
        this.toast.warning(
          `Cannot proceed to your following request, Pls Contact IT Support for Assistance`
        );
      } else {
        this.toast.warning(
          `Cannot proceed with the ${message}, Pls Contact IT Support for Assistance`
        );
      }
    }
  }
}