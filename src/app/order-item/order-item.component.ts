import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewOrder } from '../neworder';
import { OrderService } from '../order.service';


@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent implements OnInit {

  order: NewOrder[] = [];
  form: any = {};
  index: number = 0;
  employeeShippingAddress: string;
  employeePhoneNumber: number;

  map: any = new Map();

  buttonMDisabled = false;
  buttonKeyboardDisabled: boolean = false;
  buttonMouseDisabled: boolean = false;
  buttonChairDisabled: boolean = false;
  buttonTableDisabled: boolean = false;

  constructor(private router: Router, private userservice: OrderService, private modalService: NgbModal) { }

  ngOnInit(): void {

    this.index = 0;
  }

  addLGMonitor(status: boolean) {

    this.buttonMDisabled = status;
    this.map.set("LG Monitor", 1);
  }

  addHPMonitor(status: boolean) {

    this.buttonMDisabled = status;
    this.map.set("HP Monitor", 1);
  }

  addMouser(status: boolean) {

    this.buttonMouseDisabled = status;
    this.map.set("Mouse", 1);
  }

  addKeybord(status: boolean) {

    this.buttonKeyboardDisabled = status;
    this.map.set("Keyboard", 1);
  }

  addchair(status: boolean) {

    this.buttonChairDisabled = status;
    this.map.set("Chair", 1);
  }

  addtable1(status: boolean) {

    this.buttonTableDisabled = status;
    this.map.set("Table 1", 1);
  }

  addtable2(status: boolean) {

    this.buttonTableDisabled = status;
    this.map.set("Table 2", 1);
  }


  clearArray() {

    while (this.order.length) {
      this.order.pop();
    }
  }

  confirmOrder() {

    console.log("confirmOrder " + this.map.size);
    if (this.map.size != 0) {
      var T = document.getElementById("TestsDiv");
      T.style.display = "block";
    }
  }

  addToCart() {

    document.getElementById("TestsDiv").style.display = "none";
    document.getElementById("Items-list").style.display = "none";
    console.log(this.map);

    const payload: NewOrder[] = [];

    this.map.forEach((element, index) => {

      const order1 = new NewOrder();
      order1.itemRequested = index;
      order1.phnNo = this.employeePhoneNumber;
      order1.shippingAddress = this.employeeShippingAddress;
      order1.qty = 1;
      payload.push(order1);
    });
    this.userservice.createOrder(payload).subscribe(data => {
    },
      error => console.log(error));
    this.clearArray();
  }

  Remove(emporder: any) {

    switch (emporder) {

      case "LG Monitor": {

        this.addLGMonitor(false);
        break;
      }
      case "HP Monitor": {

        this.addHPMonitor(false);
        break;
      }
      case "Mouse": {

        this.addMouser(false)
        break;
      }
      case "Keyboard": {

        this.addKeybord(false);
        break;
      }
      case "Chair": {

        this.addchair(false)
        break;
      }
      case "Table 1": {

        this.addtable1(false)
        break;
      }
      case "Table 2": {

        this.addtable2(false)
        break;
      }
    }

    this.map.delete(emporder);
    console.log("Inside Remove button " + emporder + " tota qty = " + this.map);
  }
}
