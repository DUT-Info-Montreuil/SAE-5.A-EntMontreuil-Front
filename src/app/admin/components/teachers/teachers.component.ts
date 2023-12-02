import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  displayModalDelete:boolean = false;
  username !: string;
  teacher_id!:number;
  //update
  teacherModal !: Teacher;
  displayModal : boolean = false;
  teacherUpdateForm!: FormGroup;
  oldUsername !: string;
  ErrorMessage: string = '';
  old_initial!:string;
  old_nip!:string;

  constructor(private teachersServices : TeachersService,private formBuilder: FormBuilder,private router: Router){

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


  
  openModal(teacher : any) {
    this.oldUsername = teacher.user.username
    this.displayModal = true;
    this.teacherModal = (teacher);
    console.log(teacher)
    this.old_initial =teacher.personal_info.initial;
    this.teacherUpdateForm = this.formBuilder.group({
      id : [teacher.personal_info.id, Validators.required],
      username: [teacher.user.username, Validators.required],
      first_name: [teacher.user.first_name, Validators.required],
      last_name: [teacher.user.last_name, Validators.required],
      email: [teacher.user.email, Validators.required],
      admin: [teacher.user.isAdmin],
      initial: [teacher.personal_info.initial],
      desktop: [teacher.personal_info.desktop],
    });
  }


  onSubmit(){
    const { id, username, first_name, last_name,  email, initial, desktop, admin  } = this.teacherUpdateForm.value;

    console.log(this.teacherUpdateForm.value)

    this.teachersServices.updateTeacher(username,  first_name,last_name, email, id, this.oldUsername, initial, this.old_initial, admin, desktop).subscribe({

      next: (loginResponse) => {
        if (loginResponse.id) {
          location.reload();

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

  onAdminCheckboxChange(event: any) {
    this.teacherUpdateForm.get('admin')?.setValue(event.checked);
  }


  openModalDelete(teacher : any) {   
    this.teacher_id = teacher.personal_info.id; 
    console.log(this.teacher_id)
    this.username = teacher.user.username;
    this.displayModalDelete = true;
    this.ErrorMessage = '';
  }

  closeModalDelete(){
    this.displayModalDelete = false;
  }

  deleteTeacher(){
    this.teachersServices.deleteTeacher(this.teacher_id).subscribe({

      next: (loginResponse) => {
        if (loginResponse.id) {
          location.reload();
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
