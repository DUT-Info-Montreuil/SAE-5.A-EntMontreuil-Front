import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
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
  student_id!:number;
  username!:string;
  displayModalDelete:boolean = false;


  //update
  studentModal !: Student;
  displayModal : boolean = false;
  studentUpdateForm!: FormGroup;
  oldUsername !: string;
  ErrorMessage: string = '';
  old_ine!:string;
  old_nip!:string;

  constructor(private studentsServices : StudentsService,  private formBuilder: FormBuilder,private router: Router, private messageService : MessageService){

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


  openModal(student : any) {
    this.oldUsername = student.user.username
    this.displayModal = true;
    this.ErrorMessage = "";
    this.studentModal = (student);
    this.old_ine =student.personal_info.ine;
    this.old_nip = student.personal_info.nip;
    this.studentUpdateForm = this.formBuilder.group({
      id : [student.personal_info.id, Validators.required],
      username: [student.user.username, Validators.required],
      first_name: [student.user.first_name, Validators.required],
      last_name: [student.user.last_name, Validators.required],
      email: [student.user.email, Validators.required],
      apprentice: [student.personal_info.apprentice],
      ine: [student.personal_info.ine],
      nip: [student.personal_info.nip],
    });
  }


  onSubmit(){
    const { id, username, first_name, last_name,  email, apprentice, ine, nip  } = this.studentUpdateForm.value;

    console.log(this.studentUpdateForm.value)

    
    
    this.studentsServices.updateStudent( username,  first_name,last_name, email, id, this.oldUsername, nip , ine, apprentice, this.old_ine, this.old_nip).subscribe({

      next: (loginResponse) => {
        if (loginResponse.id) {
          this.fetchAllUsers();
          this.displayModal = false;
          this.messageService.add({ severity: 'success', summary: 'Succès', detail: "Étudiant modifié"});
        }
      },
      error: (loginError) => {
        if (loginError.status === 400) {
          this.ErrorMessage = loginError.error.error;
        } else {
          this.ErrorMessage = 'Une erreur est survenue lors de la connexion.';
        }
      }
    });

  }

  onApprenticeCheckboxChange(event: any) {
    this.studentUpdateForm.get('apprentice')?.setValue(event.checked);
  }


  openModalDelete(student : any) {   
    this.student_id = student.personal_info.id; 
    console.log(this.student_id)
    this.username = student.user.username;
    this.displayModalDelete = true;
    this.ErrorMessage = '';
  }

  closeModalDelete(){
    this.displayModalDelete = false;
  }

  deleteStudent(){
    this.studentsServices.deleteStudent(this.student_id).subscribe({

      next: (loginResponse) => {
        if (loginResponse.id) {
          this.fetchAllUsers();
          this.displayModalDelete = false;
          this.messageService.add({ severity: 'success', summary: 'Succès', detail: "Étudiant supprimé"});
        }
      },
      error: (loginError) => {
        if (loginError.status === 400) {
          this.ErrorMessage = loginError.error.error;
        } else {
          this.ErrorMessage = 'Une erreur est survenue lors de la connexion.';
        }
      }
    });
  }
}
/*ENT Montreuil is a Desktop Working Environnement for the students of the IUT of Montreuil
    Copyright (C) 2024  Steven CHING, Emilio CYRIAQUE-SOURISSEAU ALVARO-SEMEDO, Ismail GADA, Yanis HAMANI, Priyank SOLANKI

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.*/