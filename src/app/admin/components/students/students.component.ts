import { Component } from '@angular/core';
import { Student } from 'src/app/core/models/students.model';
import { StudentsService } from 'src/app/core/services/students.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent {

  students !: Student[]
  totalRecords: number = 0;

  constructor(private studentsServices : StudentsService){

  }
  ngOnInit(): void {
    this.fetchAllUsers();
  }

  fetchAllUsers(){
    this.studentsServices.getAllStudents().subscribe(
      (data: any) => {
        this.students = data.map((userObj: any) => userObj); // Filtrer les utilisateurs
        this.totalRecords = this.students.length;
      },
      (error) => {
        console.error('Erreur lors de la récupération des utilisateurs :', error);
      }
    );
  }
}
