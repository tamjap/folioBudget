import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { User } from '../classes/user';
import { Category } from '../classes/category';
import { Income } from '../classes/income';
import { PaymentItem } from '../classes/paymentItem';
import { CategoryPayments } from '../classes/categoryPayments'
import { Utilities } from '../../assets/JS/utilities';

import { USERS } from '../mockData/mock-users';
import { CATEGORIES } from '../mockData/mock-categories';
import { INCOMES } from '../mockData/mock-incomes';
import { PAYMENTITEMS } from '../mockData/mock-paymentItems';

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",  
];

@Component({
  selector: 'app-master-page',
  templateUrl: './master-page.component.html',
  styleUrls: ['./master-page.component.scss'],
})

export class MasterPageComponent implements OnInit {
  title = 'Monthly Budget';
  month = months[new Date().getMonth()];
  currentUser: User;
  categories: Category[];
  paymentItems: PaymentItem[];
  allCategoryPayments: CategoryPayments[];
  incomes: Income[];
  incomeTotal: number;
  paymentTotal: number;

  constructor (
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private util: Utilities
  ){}

  ngOnInit() {
    this.getCurrentUser();
    this.categories = CATEGORIES.filter(category => {
      return category.userID === this.currentUser.id;
    });
    let categoryIDs = this.categories.map(category => category.id);

    this.paymentItems = PAYMENTITEMS.filter(paymentItem => {
      return categoryIDs.includes(paymentItem.categoryID)
    });

    this.allCategoryPayments = [];
    this.categories.forEach(category => {
      let thisCatPayments = this.paymentItems.filter(paymentItem => {
        return paymentItem.categoryID === category.id;
      });
      let categoryTotal = this.util.sumProperty(thisCatPayments, 'amount');
      this.allCategoryPayments.push({ category: category, paymentItems: thisCatPayments, paymentTotal: categoryTotal});
    });

    this.incomes = INCOMES.filter(income => {
      return income.userID === this.currentUser.id;
    });

    this.incomeTotal = this.util.sumProperty(this.incomes, 'amount');
    this.paymentTotal = this.util.sumProperty(this.paymentItems, 'amount');
  }

  getCurrentUser() {
    const id = +this.activatedRoute.snapshot.paramMap.get('user');
    let loginUser = USERS.filter(user =>{
      return user.id === id;
    });
    if (loginUser.length>0) {
      this.currentUser = loginUser[0];
    }
    else {
    alert("Error getting user " + id);
    this.router.navigate(['login']);
    }
  }
}
