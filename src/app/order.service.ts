import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewOrder } from './neworder';
import { TokenStorageService } from './_services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  //private baseURL = "http://localhost:8080/api/v1/Order";
  //private baseURL_2 = "http://localhost:8080/api/v1/Order/emp";
  currentUser: any;

  

  constructor(private http: HttpClient, private token: TokenStorageService) {
    
   }
   ngOnInit(): void {
    this.currentUser = this.token.getUser();
    console.log(this.currentUser.username);
   }

  createOrder(order: NewOrder[]): Observable<Object>{
    //let username = "sakshi";
   // let password = "abcdef";
    //console.log("____"+order);
    //const headers = new HttpHeaders({Authorization:'Basic '+btoa(username+":"+password)})
    const httpOptins = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + window.sessionStorage.getItem('auth-token'),

      })
    };
    return this.http.post(`${"http://localhost:8080/employee/"}`, order, httpOptins);
   }


   getOrderList(): Observable<NewOrder[]>{
    //let username = "sakshi";
    //let password = "abcdef";
    //const headers = new HttpHeaders({Authorization:'Basic '+btoa(username+":"+password)})
    return this.http.get<NewOrder[]>(`${"http://localhost:8080/employee/"}`);
  }

  // getOrderById(empid: number): Observable<OrderClass>{
  //   //let username = "sakshi";
  //   //let password = "abcdef";
  //   //empid = 5;
  //   //const headers = new HttpHeaders({Authorization:'Basic '+btoa(username+":"+password)})
  //   // return this.http.get<OrderClass>(`${"http://localhost:8080/employee"}/${empid}`,{headers});
  //   return this.http.get<OrderClass>(`${"http://localhost:8080/employee"}/${empid}`);
  // }

  deleteOrder(orderid: number): Observable<Object>{
    //let username = "sakshi";
    //let password = "abcdef";
    //const headers = new HttpHeaders({Authorization:'Basic '+btoa(username+":"+password)})
    return this.http.delete(`${"http://localhost:8080/employee"}/${orderid}`);
  }

  //Ventor List

  getVentor(): Observable<NewOrder[]>{
    //let username = "sakshi";
    //let password = "abcdef";
    //const headers = new HttpHeaders({Authorization:'Basic '+btoa(username+":"+password)})
    return this.http.get<NewOrder[]>(`${"http://localhost:8080/vendor/"}`);
  }

  updateOrderByVendor(orderId: number, date: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + window.sessionStorage.getItem('auth-token'),
      })
    };
    return this.http.patch(`${"http://localhost:8080/vendor/"}`+ orderId, {"shippedDate": date}, httpOptions);
  }
}
