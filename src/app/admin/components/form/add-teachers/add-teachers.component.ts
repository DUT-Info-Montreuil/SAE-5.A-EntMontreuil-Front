import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { TeachersService } from 'src/app/core/services/teachers.service';

@Component({
  selector: 'app-add-teachers',
  templateUrl: './add-teachers.component.html',
  styleUrls: ['./add-teachers.component.scss']
})
export class AddTeachersComponent {

  teacherForm: FormGroup;
  isAdmin : boolean = false;
  isTTManager : boolean = false;
  ErrorMessage: string = '';
  TeacherAddedMessage: string = '';
  displayModal: boolean = false;


  constructor(private formBuilder: FormBuilder,  private teachersService : TeachersService, private messageService: MessageService) {
    this.teacherForm = this.formBuilder.group({
      username: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      admin: [''],
      ttmanager: [''],
      password: ['', Validators.required],
      desktop: ['', Validators.required],
      initial: ['', Validators.required]
    });
  }

  onSubmit() {
    
    // To get form values, you can access them using the form controls
    const { username, initial,first_name, last_name, password, email, admin , desktop, ttmanager } = this.teacherForm.value;
    if (admin[0] == 'true') {
      this.isAdmin = true;
    }
    if (ttmanager[0] == 'true') {
      this.isTTManager = true;
    }

    this.teachersService.addTeacher(username,  first_name,last_name, email, desktop,this.isAdmin,password, initial, this.isTTManager).subscribe({

      next: (loginResponse) => {
        if (loginResponse.username) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Enseignant ajouté ! ' });
          this.ErrorMessage = '';
        }
      },
      error: (loginError) => {
        if (loginError.status === 400) {
          this.ErrorMessage = loginError.error.error;
          this.TeacherAddedMessage = '';
        
          
        } else {
          this.ErrorMessage = 'Une erreur est survenue lors de la connexion.';
          this.TeacherAddedMessage = '';
        }
      }
    });
  }

}
