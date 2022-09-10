import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user/user.service";
import {User} from "../../../shared/models/user/user";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[];
  noUsers = false;
  filterString = '';

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.showAllUsers().subscribe({
      next: response => {
        console.log(response);
        this.users = response.body;
      },
      error: error => {
        console.error(error);
        this.noUsers = true;
      }
    });
  }

}
