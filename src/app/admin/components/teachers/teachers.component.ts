import { Component } from '@angular/core';
import { Teacher } from 'src/app/core/models/teachers.model';
import { TeachersService } from 'src/app/core/services/teachers.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss']
})
export class TeachersComponent {

  teachers !: Teacher[]
  totalRecords: number = 0;

  constructor(private teachersServices : TeachersService){

  }
  ngOnInit(): void {
    this.fetchAllUsers();
  }

  fetchAllUsers(){
    this.teachersServices.getAllTeachers().subscribe(
      (data: any) => {
        this.teachers = data.map((userObj: any) => userObj); // Filtrer les utilisateurs
        this.totalRecords = this.teachers.length;
      },
      (error) => {
        console.error('Erreur lors de la récupération des utilisateurs :', error);
      }
    );
  }

}
