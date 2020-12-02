import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FileManager } from 'src/app/components/input-file/input-file.component';
import { ServiceProvider } from 'src/app/models/ServiceProvider.dto';
import { ServiceProviderService } from 'src/app/services/service-provider.service';

@Component({
  selector: 'app-service-provider',
  templateUrl: './service-provider.component.html',
  styleUrls: ['./service-provider.component.scss']
})
export class ServiceProviderComponent implements OnInit {

  model: ServiceProvider = new ServiceProvider();

  constructor(
    private service: ServiceProviderService,
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
    this.model = result.data as ServiceProvider;
  }

  async save(): Promise<void> {
    const result = await this.service.post(this.model);
    if (result.success) {
      this.matSnack.open('Prestador salva com Sucesso', undefined, { duration: 3000 });
      this.router.navigateByUrl('/servicesproviders');
    }
  }

  selectedFile(file: FileManager): void {
    if (file.base64Data) {
      this.model.photo = file.base64Data;
    }
  }

}