import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  


  constructor(private formBuilder: FormBuilder,  private studentsService : StudentsService) {
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
