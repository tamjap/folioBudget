import { Component, OnInit, Input, Inject, Output, EventEmitter } from '@angular/core';

import { User } from '../classes/user';
import { Category } from '../classes/category';
import { Income } from '../classes/income';
import { PaymentItem } from '../classes/paymentItem';
import { CategoryPayments } from '../classes/categoryPayments';
import { Utilities } from '../../assets/JS/utilities';

@Component({
  selector: 'app-master-budget',
  templateUrl: './master-budget.component.html',
  styleUrls: ['./master-budget.component.scss']
})

export class MasterBudgetComponent implements OnInit {
  @Input() currentUser: User;
  @Input() categories: Category[];
  @Input() paymentItems: PaymentItem[];
  @Input() incomes: Income[]
  @Input() incomeTotal: number;
  @Input() paymentTotal: number;
  @Input() allCategoryPayments: CategoryPayments[]
  
  @Output() changeChart = new EventEmitter<string>();
   
  constructor(private util: Utilities) { }

  ngOnInit() {
  }

  updateChart(group: string) {
    this.changeChart.next(group.toLowerCase());
  }
}
