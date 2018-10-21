import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { User } from '../classes/user';
import { Globals } from '../globals';
import { USERS } from '../mockData/mock-users';

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
  providers: [ Globals ],
})
export class MasterPageComponent implements OnInit {
  title = 'Monthly Budget';
  month = months[new Date().getMonth()];
  private currentUser: User;

  constructor (
    private globals: Globals, 
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
  ){}
  ngOnInit() {
    this.getCurrentUser();
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
