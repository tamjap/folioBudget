import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../classes/user';
import { USERS } from '../mockData/mock-users';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {
  public warningMessage: string;
  private currentUser: User;
  constructor(private router: Router) { 
    this.warningMessage = "";
  }
  ngOnInit() {
  }

  login(userName: string, password: string) {
    let loginUser = USERS.filter(user =>{
      return user.userName === userName;
    });
    if (loginUser.length>0) {
      this.currentUser = loginUser[0];
      if (this.currentUser.password === password) {
        this.router.navigate(['master/', this.currentUser.id]);
      }
      else {
        this.warningMessage = "Invalid Password";
      }
    }
    else {
      this.warningMessage= userName + " not found";
    }
  }
}
