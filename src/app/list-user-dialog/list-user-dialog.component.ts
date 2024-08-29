import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UserService } from '../services/user.service';
import { tap } from 'rxjs';
import { User } from '../model/user.type';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-list-user-dialog',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './list-user-dialog.component.html',
  styleUrl: './list-user-dialog.component.scss'
})
export class ListUserDialogComponent implements OnInit {

  dataSource = new MatTableDataSource<User[]>([]);

  _data: any[] = [];
  constructor(private userService: UserService) {
  }

  get data(): any[] {
    return this._data;
  }
  set data(value: any[]) {
    this.dataSource = new MatTableDataSource(value);
  }

  displayedColumns: string[] = [
    'id',
    'avatar',
    'first_name',
    'last_name',
    'email',
  ];
  currenPage = 1;
  pagination = {page: this.currenPage, per_page: 6, total: 0, total_page: 0};

  ngOnInit(): void {
    this.loadAllRegisterUsers();
  } 

  onChangePage(event: PageEvent) {
    if (event.pageIndex !== this.currenPage - 1) {
      this.currenPage = event.pageIndex + 1;
      this.loadAllRegisterUsers();
    }
  }

  loadAllRegisterUsers() {
    this.userService.getAllRegisterUsers(this.currenPage).pipe(
      tap(res => {
        this.pagination = {page: res.page, per_page: res.per_page, total: res.total, total_page: res.total_pages};
        this.data = res.data;
      })
    ).subscribe();
}
}
