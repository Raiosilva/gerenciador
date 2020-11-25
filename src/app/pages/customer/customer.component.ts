import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/models/Customer.dto';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  model: Customer = new Customer();

  constructor(
    private service: CustomerService,
    private matSnack: MatSnackBar,
    private router: Router,
    private active: ActivatedRoute
  ) { }

  ngOnInit() {
    this.active.params.subscribe(p => this.getId(p.id));
  }

  async getId(uid: string): Promise<void> {
    if (uid === 'new') { return };

    const result = await this.service.getById(uid);
    this.model = result.data as Customer;
  }

  async save(): Promise<void> {
    const result = await this.service.post(this.model);
    if (result.success) {
      this.matSnack.open('Cliente salva com Sucesso', undefined, { duration: 3000 });
      this.router.navigateByUrl('/customers');
    }
  }

}