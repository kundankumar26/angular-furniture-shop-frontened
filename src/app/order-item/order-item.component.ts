import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewOrder } from '../neworder';
import { OrderService } from '../order.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent implements OnInit {

  
  order: NewOrder[] = [];
  index: number = 0;
  employeeShippingAddress: string;
  employeePhoneNumber: number;
  
  buttonLGDisabled = false;
  buttonHPDisabled: boolean = false;
  buttonKeyboardDisabled: boolean = false;
  buttonMouseDisabled: boolean = false;
  buttonChairDisabled: boolean = false;
  buttonTable1Disabled: boolean = false;
  buttonTable2Disabled: boolean = false;
  
  quantity: number = null;
  
  constructor(private router: Router, private userservice : OrderService) {
    
   }

  ngOnInit(): void {

    this.index = 0;
  }


  addLGMonitor(){
      this.buttonLGDisabled = true;
      const order1 = new NewOrder();
      order1.itemRequested = "LG Monitor";
      order1.qty = 1;
      this.order.push(order1);
      this.quantity += order1.qty;
      console.log("LG"+order1.qty);
      
  }
  addHPMonitor(){
    this.buttonHPDisabled = true;
    const order1 = new NewOrder();
    order1.itemRequested = "HP monitor";
    order1.qty = 1;
    this.order.push(order1);
    this.quantity += order1.qty;
    }

    //this.order[this.index++].itemRequested = 'LG Monitor HP';
    //if(this.order.itemRequested == null) this.order.itemRequested='HP monitor';
    //else this.order.itemRequested = this.order.itemRequested.concat(', HP monitor');

    //this.order.qty += 1;
    //console.log("HP Monitor added to cart" +" "+this.order.qty)
    
  addMouser(){
    this.buttonMouseDisabled = true;
    const order1 = new NewOrder();
    order1.itemRequested = "Mouse";
    order1.qty = 1;
    this.order.push(order1);
    this.quantity += order1.qty;
    
  }
  addKeybord(){
    this.buttonKeyboardDisabled = true;
    const order1 = new NewOrder();
    order1.itemRequested = "Keybord";
    order1.qty = 1;
    this.order.push(order1);
    this.quantity += order1.qty;

  }

  addchair(){
    this.buttonChairDisabled = true;
    const order1 = new NewOrder();
    order1.itemRequested = "Chair";
    order1.qty = 1;
    this.order.push(order1);
    this.quantity += order1.qty;
  }

  addtable1(){
    this.buttonTable1Disabled = true;
    const order1 = new NewOrder();
    order1.itemRequested = "table 1";
    order1.qty = 1;
    this.order.push(order1);
    this.quantity += order1.qty;
  }

  addtable2(){
    this.buttonTable2Disabled = true;
    const order1 = new NewOrder();
    order1.itemRequested = "table 2";
    order1.qty = 1;
    this.order.push(order1);
    this.quantity += order1.qty;
  }
//----------------------------------------
saveOrder(){
  console.log(this.order);
  this.order.forEach(data => {
    data.shippingAddress = this.employeeShippingAddress;
    data.phnNo = this.employeePhoneNumber;
  })
   this.userservice.createOrder(this.order).subscribe( data =>{
     //console.log(data);
   },
   error => console.log(error));
 }

//  goToOrder(){
//    this.router.navigate(['/order']);
// }
//----------------------------------------

  addToCart(){
    this.saveOrder();
    //console.log(this.employeePhoneNumber, this.employeeShippingAddress);
    this.clearArray();
    document.getElementById("TestsDiv").style.display = "none";
    //window.location.reload();
  }

  clearArray() {
    while (this.order.length) {
      this.order.pop();
    }
  }

  confirmOrder() {
    if(this.order.length != 0 && this.quantity != null){ 
      var T = document.getElementById("TestsDiv");
      T.style.display = "block"; 
    }
  }
}
