import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users !: User[]
  totalRecords: number = 0;

  constructor(private usersServices : UsersService){

  }
  ngOnInit(): void {
    this.fetchAllUsers();
  }

  fetchAllUsers(){
    this.usersServices.getAllUsers().subscribe(
      (data: any) => {
        this.users = data.map((userObj: any) => userObj.user); // Filtrer les utilisateurs
        this.totalRecords = this.users.length;
      },
      (error) => {
        console.error('Erreur lors de la récupération des utilisateurs :', error);
      }
    );
  }



}
