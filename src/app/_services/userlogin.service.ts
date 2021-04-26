import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../employee';


@Injectable({
  providedIn: 'root'
})
export class UserloginService {

  //private baseURL = "http://localhost:8080/api/v1/employees";

  constructor(private http: HttpClient) { }

  getEmployeesList(): Observable<Employee[]>{
    //let username = "sakshi";
    //let password = "abcdef";
    //const headers = new HttpHeaders({Authorization:'Basic '+btoa(username+":"+password)})
    return this.http.get<Employee[]>(`${"http://localhost:8080/employee/"}`);
  }

}
