import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { User } from '../classes/user';
import { Category } from '../classes/category';
import { Income } from '../classes/income';
import { PaymentItem } from '../classes/paymentItem';
import { CategoryPayments } from '../classes/categoryPayments'
import { ChartData } from '../classes/chartData';
import { CalendarData } from '../classes/calendarData';
import { Utilities } from '../../assets/JS/utilities';
import { PieChartComponent } from '../pie-chart/pie-chart.component';

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
  @ViewChild(PieChartComponent) pieChartPage: PieChartComponent;

  title = 'Monthly Budget';
  month = months[new Date().getMonth()];
  currentUser: User;
  categories: Category[];
  paymentItems: PaymentItem[];
  allCategoryPayments: CategoryPayments[];
  incomes: Income[];
  incomeTotal: number;
  paymentTotal: number;
  chartData: ChartData[];
  calendarData: CalendarData[];
  rightFrameTitle: string;
  rightPanel: string;

  constructor (
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private util: Utilities
  ){}

  ngOnInit() {
    this.rightPanel = "pieChart";
    this.getCurrentUser();

    //Master Budget Data
    this.categories = CATEGORIES.filter(category => {
      return category.userID === this.currentUser.id;
    });
    let categoryIDs = this.categories.map(category => category.id);

    this.paymentItems = PAYMENTITEMS.filter(paymentItem => {
      return categoryIDs.indexOf(paymentItem.categoryID)>=0;
    });

    this.allCategoryPayments = [];
    this.chartData = [];
    this.categories.forEach(category => {
      let thisCatPayments = this.paymentItems.filter(paymentItem => {
        return paymentItem.categoryID === category.id;
      });
      let categoryTotal = this.util.sumProperty(thisCatPayments, 'amount');
      let description = category.description;
      this.allCategoryPayments.push({ category: category, paymentItems: thisCatPayments, paymentTotal: categoryTotal});
      this.chartData.push({ description: description, amount: categoryTotal })
    });

    this.incomes = INCOMES.filter(income => {
      return income.userID === this.currentUser.id;
    });

    this.incomeTotal = this.util.sumProperty(this.incomes, 'amount');
    this.paymentTotal = this.util.sumProperty(this.paymentItems, 'amount');
    this.rightFrameTitle = "Budget";
  
    //Calendar
    let now = new Date();
    let dayCount = new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();
    let balance = 0;
    this.calendarData = [];

    for (let x=1; x<=dayCount; x++) {
      this.calendarData.push({ day: x, income: 0, incomeTT: '', payment: 0, paymentTT: '', balance: 0 });
    }
    this.incomes.forEach(income => {
      income.dueDay.forEach(dueDate => {
        let amount = Math.round(income.amount / income.dueDay.length);
        let day=dueDate;
        if (day > dayCount) {
          day = dayCount;
        }
        this.calendarData[day - 1].income += amount;
        if (this.calendarData[day - 1].incomeTT.length > 0) {
          this.calendarData[day - 1].incomeTT += '\n';
        }
        this.calendarData[day - 1].incomeTT += "$ " + amount.toFixed(2).toString();
        this.calendarData[day - 1].incomeTT += ":   " + income.description;
      });
    });
    this.paymentItems.forEach(paymentItem => {
      paymentItem.dueDay.forEach(dueDate => {
        let amount = Math.round(paymentItem.amount / paymentItem.dueDay.length);
        let day=dueDate;
        if (day > dayCount) {
          day = dayCount;
        }
        this.calendarData[day - 1].payment += amount;
        if (this.calendarData[day - 1].paymentTT.length > 0) {
          this.calendarData[day - 1].paymentTT += '\n';
        }
        this.calendarData[day - 1].paymentTT += "$ " + amount.toFixed(2).toString();
        this.calendarData[day - 1].paymentTT += ":   " + paymentItem.description;
      })
    })
    for (let x=0; x<dayCount; x++) {
      balance += this.calendarData[x].income;
      balance -= this.calendarData[x].payment;
      this.calendarData[x].balance = balance;
    }
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

  updateChart(category: string) {
    this.getChartData(category);
    if (category.length === 0 || category === "master") {
      category = "Budget";
    }
    this.pieChartPage.updateChart(this.chartData,category);
  }
  getChartData(group: string) {
    this.chartData = [];
    let arrCategory = this.categories.filter(category => {
      return category.description.toLowerCase() === group.toLowerCase();
    });
    if (arrCategory.length > 0) {
      let items = this.paymentItems.filter(paymentItem => {
        return paymentItem.categoryID === arrCategory[0].id;
      });
      items.forEach(item => {
        this.chartData.push({ description: item.description, amount: item.amount });
      });
    }
    else {
      this.allCategoryPayments.forEach(category => {
        this.chartData.push({
              description: category.category.description,
              amount: this.util.sumProperty(category.paymentItems, 'amount')
        });
      });
    }
  }
}
