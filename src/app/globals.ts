import { Injectable } from "@angular/core";

import { User } from './classes/user';

@Injectable()
export class Globals {
    currentUser: User;
}