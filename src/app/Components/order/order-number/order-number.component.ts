import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order-number',
  templateUrl: './order-number.component.html',
  styleUrls: ['./order-number.component.scss']
})
export class OrderNumberComponent implements OnInit {
   orderNumber:Number=0
  constructor(private route:Router,private activatedRout:ActivatedRoute) { }

  ngOnInit(): void {
   this.orderNumber=parseInt(localStorage.getItem("orderNumber")||'');
  }
  gotoOrder()
  {
    this.route.navigate(["order/Orders"]);
  }

}
