import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { RolesService } from 'src/app/core/services/roles.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit{
  allRoles !: any
  roleForm!: FormGroup;
  ErrorMessage !: string;

  constructor(private rolesService : RolesService,private formBuilder: FormBuilder, private messageService: MessageService){}

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
            this.messageService.add({ severity: 'success', summary: 'Success', detail: "Rôle ajouté avec succès"});
          }
        },
        error: (loginError) => {
    
          if (loginError.status === 400) {
            this.messageService.add({ severity: 'error', summary: 'error', detail: "Le rôle existe déjà"});
            
          } 
        }
      });
        
  
    }
  }
}
