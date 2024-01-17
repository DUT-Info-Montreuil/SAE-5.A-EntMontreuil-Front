import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Role } from 'src/app/core/models/role.model';
import { RolesService } from 'src/app/core/services/roles.service';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})
export class AddUsersComponent {

  userForm: FormGroup;
  filteredRoles!: Role[];
  allRoles!: Role[];
  isAdmin : boolean = false;
  isTTManager : boolean = false;
  ErrorMessage: string = '';
  roleString !: string;
  UserAddedMessage: string = '';


  constructor(private formBuilder: FormBuilder, private roleService: RolesService, private userService : UsersService, private messageService: MessageService) {
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      admin: [''],
      ttmanager: [''],
      role: ['', Validators.required]
    });
  }

  ngOnInit() {
      // Initialisation de this.allRoles à partir du service
  this.roleService.getRoles().subscribe((data) => {
    this.allRoles = data;
  });
  }

  filterRoles(event: any) {
    const query = event.query;
    this.filteredRoles = this.allRoles.filter((role) => {
      return role.name.toLowerCase().includes(query.toLowerCase());
    });
  }

  onSubmit() {
    const { username, password,first_name, last_name, role, email, admin, ttmanager  } = this.userForm.value;
    if (admin[0] == 'true') {
      this.isAdmin = true;
    }
    if (ttmanager[0] == 'true') {
      this.isTTManager = true;
    }

    if (typeof role === 'string') {
      this.roleString = role;
    } else {
      this.roleString = role.name;
    }

    this.userService.addUser( username, first_name,last_name, email, this.roleString,this.isAdmin,password, this.isTTManager).subscribe({

      next: (loginResponse) => {
        if (loginResponse.username) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Utilisateur ajouté !' });
          this.ErrorMessage = '';
        }
      },
      error: (loginError) => {
  
        if (loginError.status === 400) {
          this.ErrorMessage = loginError.error.error;
          this.UserAddedMessage = '';
        
          
        } else {
          this.ErrorMessage = 'Une erreur est survenue lors de la connexion.';
          this.UserAddedMessage = '';
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