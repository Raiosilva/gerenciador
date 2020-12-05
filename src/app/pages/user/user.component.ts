import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { FileManager } from 'src/app/components/input-file/input-file.component';
import { User } from 'src/app/models/User.dto';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  model: User = new User();

  constructor(
    private service: UserService,
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
    this.model = result.data as User;
  }

  async save(): Promise<void> {
    const result = await this.service.post(this.model);
    if (result.success) {
      this.matSnack.open('Usuário salvo com Sucesso', undefined, { duration: 3000 });
      this.router.navigateByUrl('/users');
    }
  }

  selectedFile(file: FileManager): void {
    if (file.base64Data) {
      this.model.photo = file.base64Data;
    }
  }

}