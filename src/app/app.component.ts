import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegisterUserComponent } from './register-user/register-user.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ListUserDialogComponent } from './list-user-dialog/list-user-dialog.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RegisterUserComponent, MatButtonModule, MatDialogModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private dialog: MatDialog) {}

  openUserDialog() {
    this.dialog.open(ListUserDialogComponent, {
      maxWidth: '700px',
      maxHeight: '700px'
    });
  }
}
