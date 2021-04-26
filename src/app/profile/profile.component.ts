import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../order.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserloginService } from '../_services/userlogin.service';
import {Employee} from '../employee';
import { NewOrder } from '../neworder';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: any;

  // constructor(private token: TokenStorageService) { }

  // ngOnInit(): void {
  //   this.currentUser = this.token.getUser();
  // }

    //employees: Employee[]; 
    //eorder:OrderClass[] = [];
    order1: NewOrder = new NewOrder();
    order: NewOrder[]; 
    empId:any;

    constructor(private route: ActivatedRoute, private orderService: OrderService) { }
  
    ngOnInit(): void {
      //this.getOrder();
      
      this.getOrder();
    }
  
    // Logout(){
    //   this.router.navigate(["/login"])
    // }
  
    // BackTOrder(){
    //   this.router.navigate(["/order"]);
    // }


  //   private getEmployees()
  // {
  //   this.orderService.getEmployeesList().subscribe(data => {
  //     // this.employees = data;
  //     // console.log("**"+data);
  //     this.employees = data['body'];
  //     console.log(data['body']);
      
  //   }); 
  // }

  // deleteOrder(){
  //   this.router.navigate(["/order-list"]);
  // }

  // private getOrder()
  // {
  //   this.orderService.getOrderList().subscribe(data => {
  //     this.order = data['body'];
  //     console.log(data['body']);
  //     //console.log(data['body']);
  //     //this.eorder = data;
  //     //console.log(data);
  //   }); 
  // }

  private getOrder()
  {
    this.empId = this.route.snapshot.params['empid'];
    this.order1 = new NewOrder();
    
    console.log("--"+this.empId);
    this.orderService.getOrderList().subscribe(data => {
      this.order = data['body'];
      console.log(data['body']);
    }); 
  }
  deleteOrder(orderId:number){
    document.getElementById("onsubmit").style.display = "block";
    this.orderService.deleteOrder(orderId).subscribe( data => {
      console.log(data);
      this.getOrder();
      
    })
    
  }
}
