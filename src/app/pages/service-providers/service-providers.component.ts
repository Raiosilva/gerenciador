import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Constants } from 'src/app/shared/constants';
import Swal from 'sweetalert2';
import { ServiceProvider } from '../../models/ServiceProvider.dto';
import { ServiceProviderService } from '../../services/service-provider.service';

@Component({
  selector: 'app-service-providers',
  templateUrl: './service-providers.component.html',
  styleUrls: ['./service-providers.component.scss']
})
export class ServiceProvidersComponent implements OnInit {

  columns: string[] = ['Nome', 'E-mail', 'uid'];
  dataSource: MatTableDataSource<ServiceProvider>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: ServiceProviderService
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

  async delete(model: ServiceProvider): Promise<void> {
    const  options: any = {
      ...Constants.confirm_swal_options, text: `Deseja realmente excluir o prestador ${model.name}`
    };
    const { value } = await Swal.fire(options);
    if (value) {
      const result = await this.service.remove(model.uid);
      if (result.success) {
        this.bind();
      }
    }
  }

}
