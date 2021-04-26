import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewOrder } from '../neworder';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  orders: NewOrder[];

  _isDisabled: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if(!window.sessionStorage.getItem('auth-token')){
      this.router.navigate(['login']);
    }
    this.authService.getOrdersForAdmin().subscribe(data => {
      this.orders = data.body;
      //console.log(data.body);
    }, err => {
      console.log(err.error.message);
    });
  }

  acceptOrder(orderId: number, qty: number){
    this.authService.acceptOrderByAdmin(orderId, qty).subscribe(data => {
      console.log(data);
      this.reloadPage();
    }, err => {
      console.log(err);
    });
  }

  rejectOrder(orderId: number, qty: number){
    this.authService.rejectOrderByAdmin(orderId, qty).subscribe(data => {
      console.log(data);
      this.reloadPage();
    }, err => {
      console.log(err);
    });
  }

  isDisabled(value: number): boolean {
    return value == 0 ? false : true;
  }

  reloadPage(){
    window.location.reload();
  }
}
