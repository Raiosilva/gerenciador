import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseService } from '../base/base.service';
import { IResultHttp } from '../interfaces/IResultHttp';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<any>  {

  private loginSubject = new Subject<boolean>();

  constructor(public http: HttpService) {
    super('users', http);
  }

  login(email: string, password: string): Promise<IResultHttp> {
    return this.http.post(`${environment.url_api}/users/auth`, { email, password });
  }

  configureLogin(o: any): void {
    const { token, user } = o.data;
    localStorage.setItem('platform: token', token);
    localStorage.setItem('plaform: user', JSON.stringify(user));
    this.loginSubject.next(this.isStaticLogged);
  }

  get isLogged(): Observable<boolean> {
    return this.loginSubject.asObservable();
  }

  get isStaticLogged(): boolean {
    return !!localStorage.getItem('platform: token');
  }

}
