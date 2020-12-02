import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { IMenu } from '../app/interfaces/IMenu';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLogged: boolean = false;
  subscribe: Subscription;
  menu: Array<IMenu> = new Array<IMenu>();

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.isLogged = this.userService.isStaticLogged;
    this.userService.isLogged.subscribe(logged => {
      this.isLogged = logged;
    });

    this.menu.push({
      group: 'Cadastros',
      items: [
        { icon: 'bookmark', label: 'Categorias', url: '/categorys' },
        { icon: 'bookmark_border', label: 'SubCategorias', url: '/subcategorys' },
        { icon: 'assignment', label: 'Questões', url: '/questions' }
      ]
    });
    this.menu.push({
      group: 'Pessoas',
      items: [
        { icon: 'person', label: 'Profissionais', url: '/serviceproviders' },
        { icon: 'person_pin', label: 'Clientes', url: '/customers' }
      ]
    });
    this.menu.push({
      group: 'Segurança',
      items: [
        { icon: 'security', label: 'Usuários', url: '/' }
      ]
    });
    this.menu.push({
      group: 'Gerenciamento',
      items: [
        { icon: 'format_list_bulleted', label: 'Pedidos', url: '/' }
      ]
    });
  }
}
