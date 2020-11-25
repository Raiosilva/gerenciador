import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Constants } from 'src/app/shared/constants';
import Swal from 'sweetalert2';
import { Customer } from '../../models/Customer.dto';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  columns: string[] = ['Nome', 'E-mail', 'uid'];
  dataSource: MatTableDataSource<Customer>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: CustomerService 
  ) { }

  ngOnInit() {
    this.bind();
  }

  async bind(): Promise<void> {
    const subCategorys = await this.service.getAll();
    this.dataSource = new MatTableDataSource(subCategorys.data);
    this.dataSource.paginator = this.paginator;
  }

  filter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  async delete(customer: Customer): Promise<void> {
    const  options: any = {
      ...Constants.confirm_swal_options, text: `Deseja realmente excluir o cliente ${customer.name}`
    };
    const { value } = await Swal.fire(options);
    if (value) {
      const result = await this.service.remove(customer.uid);
      if (result.success) {
        this.bind();
      }
    }
  }

}
