import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewOrder } from '../neworder';
import { OrderService } from '../order.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-ventor',
  templateUrl: './ventor.component.html',
  styleUrls: ['./ventor.component.css']
})
export class VentorComponent implements OnInit {

  orders: NewOrder[];
  constructor(private orderService: OrderService,private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // if(!window.sessionStorage.getItem('auth-token')){
    //   this.router.navigate(['login']);
    // }
    this.getOrder();
  } 

  private getOrder()
  {
    this.orderService.getVentor().subscribe(data => {
      this.orders = data['body'];
      console.log(data['body']);
    }); 
  }

  isDisabled(value: string): boolean {
    if(value!=null && value.length >=11)
      return true;
    return false;
  }

  confirmOrder(orderId: number, date: string): void {
    if(date.length == 10 && date[2] == '-' && date[5] == '-'){
        for(let i=0;i<10;i++){
          if(i==2 || i==5){
            continue;
          } else if(date[i] >= '0' && date[i] <= '9'){
            continue;
          } else {
            console.log(date[i], i);
            return;
          }
        }
        this.authService.updateOrderByVendor(orderId, date).subscribe(data => {
          console.log(data);
          window.location.reload(); 
        }, err => {
          console.log(err);
        });
      }
  }
}