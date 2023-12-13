import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Role } from 'src/app/core/models/role.model';
import { RolesService } from 'src/app/core/services/roles.service';
import { SharedService } from 'src/app/core/services/shared.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit{
  allRoles !: Role[]
  roleForm!: FormGroup;
  ErrorMessage !: string;

  constructor(private rolesService : RolesService,private formBuilder: FormBuilder, private messageService: MessageService, private sharedService: SharedService){}

  ngOnInit(): void {
    this.roleForm = this.formBuilder.group({
      name: ['', Validators.required] // Ajoutez les validateurs nécessaires ici
    });
    this.rolesService.getRoles().subscribe((data) => {
      this.allRoles = data;
    });
  }

  onSubmit() {
    if (this.roleForm.valid) {
      const roleName = this.roleForm.value.name;
      this.rolesService.addRole(roleName).subscribe({

        next: (Response) => {
          if (Response) {
            this.rolesService.getRoles().subscribe((updatedRoles) => {
              this.allRoles = updatedRoles;
              this.roleForm.reset(); 
            });
            this.messageService.add({ severity: 'success', summary: 'Succès', detail: "Rôle ajouté avec succès"});
          }
        },
        error: (loginError) => {
    
          if (loginError.status === 400) {
            this.messageService.add({ severity: 'error', summary: 'ERREUR', detail: "Le rôle existe déjà"});
            
          } 
        }
      });
        
  
    }
  }

  startUpdateRole(role : Role){
    role.isEditing = true;
    role.updateName = role.name;
  }

  stopUpdateRole(role : Role){
    role.isEditing = false;
    role.isDeleting = false;
  }

  updateRole(role : Role){
    role.isEditing = false;
    if (role.name !== role.updateName){
      this.rolesService.updateRole(role.updateName , role.id).subscribe({
        next: (Response) => {
          if (Response) {
            this.rolesService.getRoles().subscribe((data) => {
              this.allRoles = data;
            });
            this.sharedService.triggerUpdateUsers();
            this.messageService.add({ severity: 'success', summary: 'Succès', detail: "Rôle modifié avec succès"});
          }
        },
        error: (loginError) => {
    
          if (loginError.status === 400) {
            this.messageService.add({ severity: 'error', summary: 'ERREUR', detail: "Le rôle existe déjà"});
            
          } 
        }
      });
    }
  }

  startDeleteRole(role : Role){
    role.isDeleting = true;
  }

  deleteRole(role : Role){
    role.isDeleting = false;
    this.rolesService.deleteRole( role.id).subscribe({
      next: (Response) => {
        if (Response) {
          this.rolesService.getRoles().subscribe((data) => {
            this.allRoles = data;
          });
          this.sharedService.triggerUpdateUsers();
          this.messageService.add({ severity: 'success', summary: 'Succès', detail: "Rôle supprimé avec succès"});
        }
      },
      error: (loginError) => {
  
        if (loginError.status === 400) {
          this.messageService.add({ severity: 'error', summary: 'ERREUR', detail: "Erreur inconnue"});
          
        } 
      }
    });
  
  }
}
