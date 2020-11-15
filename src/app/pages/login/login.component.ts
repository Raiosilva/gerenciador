import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form: any = {};

  constructor(
    private userService: UserService,
    private matSnack: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.userService.isStaticLogged) {
      return this.router.navigateByUrl('/home');
    }
  }

  async login(): Promise<void> {
    const { email, password } = this.form;
    const result = await this.userService.login(email, password);
    console.log('result:', result);
    if (result.success) {
      this.userService.configureLogin(result);
      this.router.navigateByUrl('/home');
    } else {
      this.matSnack.open(
        'E-mail ou senha incorretos', 
        undefined,
        {
          duration: 2000
        }
      )
    }
  }
}
