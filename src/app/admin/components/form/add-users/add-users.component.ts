import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
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
  ErrorMessage: string = '';
  roleString !: string;
  UserAddedMessage: string = '';


  constructor(private formBuilder: FormBuilder, private roleService: RolesService, private userService : UsersService) {
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      admin: ['', Validators.required],
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
    console.log('Query:', query); // Vérifiez si la requête est correctement capturée
    // Filtrez les rôles en fonction de 'query' et mettez à jour filteredRoles
    this.filteredRoles = this.allRoles.filter((role) => {
      return role.name.toLowerCase().includes(query.toLowerCase());
    });
    console.log('Filtered Roles:', this.filteredRoles); // Vérifiez les rôles filtrés
  }

  onSubmit() {
    // To get form values, you can access them using the form controls
    console.log('Form values:', this.userForm.value);
    const { username, password,first_name, last_name, role, email, admin  } = this.userForm.value;
    if (admin[0] == 'true') {
      this.isAdmin = true;
    }

    if (typeof role === 'string') {
      this.roleString = role;
    } else {
      this.roleString = role.name;
    }

    this.userService.addUser( username, first_name,last_name, email, this.roleString,this.isAdmin,password).subscribe({

      next: (loginResponse) => {
        if (loginResponse.username) {
          this.UserAddedMessage = "Utilisateur ajouté ! ";
          this.ErrorMessage = '';
        }
      },
      error: (loginError) => {
  
        if (loginError.status === 400) {
          console.log(loginError.error.error);
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
