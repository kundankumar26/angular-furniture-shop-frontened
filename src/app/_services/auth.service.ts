import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SignupRequestPayload } from '../register/register-request.payload';


//const AUTH_API = 'http://localhost:8080/api/auth/';
const AUTH_API = 'http://localhost:8080/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  login(credentials): Observable<any> {
    return this.httpClient.post(AUTH_API + 'signin/', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }

  register(user): Observable<any> {
    return this.httpClient.post(AUTH_API + 'signup/', {
      username: user.username,
      email: user.email,
      password: user.password
    }, httpOptions);
  }
  signup(payload: any): any {
    return "hey there"
    //return this.httpClient.post(AUTH_API + "signup/", payload, { responseType: 'json' });
  }

  // getOrdersForEmployee(): Observable<any>{
  //   const httpOptions = {
  //     headers: new HttpHeaders({ 
  //       'Content-Type': 'application/json',
  //       'Authorization': "Bearer " + window.sessionStorage.getItem('auth-token'),
  //     })
  //   };
  //   return this.httpClient.get(AUTH_API + '/employee/', httpOptions);
  // }

  signinn(payload: any): Observable<any> {
    return this.httpClient.post(AUTH_API + 'signin/', payload);
  }

  getOrdersForAdmin(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + window.sessionStorage.getItem('auth-token'),
      })
    };
    return this.httpClient.get(AUTH_API + 'admin/', httpOptions);
    //return this.httpClient.get('http://localhost:8080/' + 'admin/', httpOptions);
  }

  acceptOrderByAdmin(orderId: number, qty: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + window.sessionStorage.getItem('auth-token'),
      })
    };
    return this.httpClient.patch(AUTH_API + 'admin/' + orderId, {"qty": qty, "isRejectedByAdmin": 1}, httpOptions);
  }

  rejectOrderByAdmin(orderId: number, qty: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + window.sessionStorage.getItem('auth-token'),
      })
    };
    return this.httpClient.patch(AUTH_API + 'admin/' + orderId, {"qty": qty, "isRejectedByAdmin": 2}, httpOptions);
  }

  updateOrderByVendor(orderId: number, date: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + window.sessionStorage.getItem('auth-token'),
      })
    };
    return this.httpClient.patch(AUTH_API + 'vendor/' + orderId, {"shippedDate": date}, httpOptions);
  }
  
}
