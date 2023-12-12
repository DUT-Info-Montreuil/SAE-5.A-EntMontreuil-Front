import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RolesService } from 'src/app/core/services/roles.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit{
  allRoles !: any
  roleForm!: FormGroup;

  constructor(private rolesService : RolesService,private formBuilder: FormBuilder){}

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
      this.rolesService.addRole(roleName).subscribe((data) => {
        // Rechargez la liste des rôles après l'ajout du nouveau rôle
        this.rolesService.getRoles().subscribe((updatedRoles) => {
          this.allRoles = updatedRoles;
          this.roleForm.reset(); // Réinitialise le formulaire après l'ajout
        });
      });
    }
  }
}
