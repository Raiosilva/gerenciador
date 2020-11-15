import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'gerenciador';
  isLogged: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.isLogged = this.userService.isStaticLogged;
    this.userService.isLogged.subscribe(logged => {
      this.isLogged = logged;
    });
  }
}
