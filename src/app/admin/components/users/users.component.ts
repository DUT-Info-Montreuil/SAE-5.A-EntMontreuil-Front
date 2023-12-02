import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from 'src/app/core/models/role.model';
import { User } from 'src/app/core/models/user.model';
import { RolesService } from 'src/app/core/services/roles.service';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users !: User[]
  totalRecords: number = 0;
  displayModalUpdate : boolean = false;
  oldUsername !: string;
  displayModalDelete : boolean = false;
  user_id!:number;
  username!:string;
  
  //update
  userModal!:User ;
  userUpdateForm!: FormGroup;
  filteredRoles!: Role[];
  allRoles!: Role[];
  ErrorMessage: string = '';
  roleString !: string;

  constructor(private usersServices : UsersService, private rolesService : RolesService, private formBuilder: FormBuilder,private router: Router){ 
    
  }


  ngOnInit(): void {
    this.fetchAllUsers();
    this.rolesService.getRoles().subscribe((data) => {
      this.allRoles = data;
    });
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

  openModalUpdate(user : any) {
    this.oldUsername = user.username
    this.displayModalUpdate = true;
    this.userModal = (user);
    this.userUpdateForm = this.formBuilder.group({
      id : [user.id, Validators.required],
      username: [user.username, Validators.required],
      first_name: [user.first_name, Validators.required],
      last_name: [user.last_name, Validators.required],
      email: [user.email, Validators.required],
      admin: [user.isAdmin],
      role: [user.role, Validators.required]
    });
  }

  onSubmit(){
    const { id, username, first_name, last_name, role, email, admin  } = this.userUpdateForm.value;

    if (typeof role === 'string') {
      this.roleString = role;
    } else {
      this.roleString = role.name;
    }

    this.usersServices.updateUser( username, first_name,last_name, email, this.roleString,admin,id, this.oldUsername).subscribe({

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

  filterRoles(event: any) {
    const query = event.query;
    this.filteredRoles = this.allRoles.filter((role) => {
      return role.name.toLowerCase().includes(query.toLowerCase());
    });
  }

  onAdminCheckboxChange(event: any) {
    this.userUpdateForm.get('admin')?.setValue(event.checked);
  }

  openModalDelete(user : any) {   
    this.user_id = user.id; 
    this.username = user.username;
    this.displayModalDelete = true;
    this.ErrorMessage = '';
  }

  closeModalDelete(){
    this.displayModalDelete = false;
  }

  deleteUser(){
    this.usersServices.deleteUser(this.user_id).subscribe({

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
