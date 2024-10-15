import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { User, UserCL } from 'src/app/models/user';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {

  http = inject(HttpClient);
  userList: User[] | undefined
  ngOnInit(): void {

    this.http.get<User[]>('https://jsonplaceholder.typicode.com/users').subscribe({

      next: (data: User[]) => {



        this.userList = data;
      },
      error: (err: any) => { }

    });




  }






}
