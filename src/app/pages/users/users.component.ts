import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/User.dto';
import { UserService } from 'src/app/services/user.service';
import { Constants } from 'src/app/shared/constants';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  columns: string[] = ['Nome', 'E-mail', 'Administrador', 'uid'];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: UserService 
  ) { }

  ngOnInit() {
    this.bind();
  }

  async bind(): Promise<void> {
    const users = await this.service.getAll();
    this.dataSource = new MatTableDataSource(users.data);
    this.dataSource.paginator = this.paginator;
  }

  filter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  async delete(user: User): Promise<void> {
    const  options: any = {
      ...Constants.confirm_swal_options, text: `Deseja realmente excluir o usuário ${user.firstName}`
    };
    const { value } = await Swal.fire(options);
    if (value) {
      const result = await this.service.remove(user.uid);
      if (result.success) {
        this.bind();
      }
    }
  }

}
