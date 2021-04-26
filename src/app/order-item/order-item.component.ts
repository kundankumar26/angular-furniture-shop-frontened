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
  items:string []=["a","b","c","d"];
  
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
      this.items.push("LG Monitor");
      order1.qty = 1;
      this.order.push(order1);
      this.quantity += order1.qty;
      console.log("LG - "+ this.items);
      
  }
  addHPMonitor(){
    this.buttonHPDisabled = true;
    const order1 = new NewOrder();
    order1.itemRequested = "HP monitor";
    this.items.push("HP monitor");
    order1.qty = 1;
    this.order.push(order1);
    this.quantity += order1.qty;
    console.log("LG - "+this.items);
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
    //this.items.concat(order1.itemRequested);
    order1.qty = 1;
    this.order.push(order1);
    this.quantity += order1.qty;
    console.log("LG - "+this.items);
  }
  addKeybord(){
    this.buttonKeyboardDisabled = true;
    const order1 = new NewOrder();
    order1.itemRequested = "Keybord";
    //this.items.concat(order1.itemRequested);
    order1.qty = 1;
    this.order.push(order1);
    this.quantity += order1.qty;
    console.log("LG - "+this.items);
  }

  addchair(){
    this.buttonChairDisabled = true;
    const order1 = new NewOrder();
    order1.itemRequested = "Chair";
    //this.items.concat(order1.itemRequested);
    order1.qty = 1;
    this.order.push(order1);
    this.quantity += order1.qty;
    console.log("LG - "+this.items);
  }

  addtable1(){
    this.buttonTable1Disabled = true;
    const order1 = new NewOrder();
    order1.itemRequested = "table 1";
    //this.items.concat(order1.itemRequested);
    order1.qty = 1;
    this.order.push(order1);
    this.quantity += order1.qty;
    console.log("LG - "+this.items);
  }

  addtable2(){
    this.buttonTable2Disabled = true;
    const order1 = new NewOrder();
    order1.itemRequested = "table 2";
    //this.items.concat(order1.itemRequested);
    order1.qty = 1;
    this.order.push(order1);
    this.quantity += order1.qty;
    console.log("LG - "+this.items);
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
