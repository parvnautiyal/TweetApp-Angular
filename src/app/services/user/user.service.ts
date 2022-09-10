import {Injectable} from '@angular/core';
import {HttpService} from "../http/http.service";
import {User} from "../../shared/models/user/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpService) {
  }

  registerUser(user: User) {
    return this.http.registerUser(user)
  }

  forgotPassword(email: string, newPassword: string) {
    return this.http.forgotPassword(email, newPassword);
  }

  loginUser(username: string, password: string) {
    return this.http.login(username, password);
  }

  showAllUsers() {
    return this.http.getAllUsers();
  }

  showUser(username:string){
    return this.http.getUser(username);
  }
}
