import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
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

  constructor(private usersServices : UsersService, private rolesService : RolesService, private formBuilder: FormBuilder, private messageService: MessageService){ 
    
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
      ttmanager: [user.isTTManager],
      role: [user.role, Validators.required]
    });
  }

  onSubmit(){
    const { id, username, first_name, last_name, role, email, admin , ttmanager } = this.userUpdateForm.value;

    if (typeof role === 'string') {
      this.roleString = role;
    } else {
      this.roleString = role.name;
    }

    this.usersServices.updateUser( username, first_name,last_name, email, this.roleString,admin,id, this.oldUsername, ttmanager).subscribe({

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

  onTTManagerCheckboxChange(event: any) {
    this.userUpdateForm.get('ttmanager')?.setValue(event.checked);
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
        }else if (loginError.status === 403) {
          this.ErrorMessage = 'Vous ne pouvez pas vous supprimer vous-même.';
        } else {
          this.ErrorMessage = 'Une erreur est survenue lors de la connexion.';
        }
      }
    });
  }

}
