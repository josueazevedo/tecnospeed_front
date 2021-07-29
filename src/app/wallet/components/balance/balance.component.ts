import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent implements OnInit {

  @Input('saldo')
  saldo: number

  constructor() { }

  ngOnInit(): void {
  }

}
