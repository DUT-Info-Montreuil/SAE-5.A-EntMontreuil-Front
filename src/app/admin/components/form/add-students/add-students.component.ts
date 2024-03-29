import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { StudentsService } from 'src/app/core/services/students.service';

@Component({
  selector: 'app-add-students',
  templateUrl: './add-students.component.html',
  styleUrls: ['./add-students.component.scss']
})
export class AddStudentsComponent {
  
  studentForm: FormGroup;
  isApprentice : boolean = false;
  ErrorMessage: string = '';
  StudentAddedMessage: string = '';

  displayModal: boolean = false;

  


  constructor(private formBuilder: FormBuilder,  private studentsService : StudentsService, private messageService: MessageService) {
    this.studentForm = this.formBuilder.group({
      username: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      apprentice: [''],
      ine: ['', Validators.required],
      nip: ['', Validators.required]
    });
  }

  onSubmit() {
    
    // To get form values, you can access them using the form controls
    const { username, nip,first_name, last_name, ine, email, apprentice  } = this.studentForm.value;
    if (apprentice[0] == 'true') {
      this.isApprentice = true;
    }

    this.studentsService.addStudent( username,  first_name,last_name, email, ine,this.isApprentice,nip).subscribe({

      next: (loginResponse) => {
        if (loginResponse.username) {
          console.log(loginResponse)
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Étudiant ajouté ! Veuillez sauvegarder le mot de passe' + loginResponse.password });
          this.StudentAddedMessage = loginResponse.message + '\nMOT DE PASSE : ' + loginResponse.password;
          this.ErrorMessage = '';
        }
      },
      error: (loginError) => {
        if (loginError.status === 400) {
          this.ErrorMessage = loginError.error.error;
          this.StudentAddedMessage = '';
        
          
        } else {
          this.ErrorMessage = 'Une erreur est survenue lors de la connexion.';
          this.StudentAddedMessage = '';
        }
      }
    });
  }

  openModal() {
    this.displayModal = true;
  }

  closeModal() {
    this.displayModal = false;
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