import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { UsersService } from 'src/app/core/services/users.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-settings-layout',
  templateUrl: './settings-layout.component.html',
  styleUrls: ['./settings-layout.component.scss']
})
export class SettingsLayoutComponent implements OnInit {

  id_user: number; 
  settingsForm: FormGroup;

  constructor(private usersService:UsersService, private auth: AuthService,  private formBuilder: FormBuilder,private messageService: MessageService) {
    this.id_user= this.auth.getUserId(); 

    this.settingsForm = this.formBuilder.group({
      notificationMail: false,
      notificationWebsite: false
    });
    
  }

  ngOnInit(): void {
    // Charger les paramètres actuels de l'utilisateur
    this.usersService.getUserSettings(this.id_user).subscribe(
      response => {
        if (response) {
          this.settingsForm = this.formBuilder.group({
            notificationMail: response.notification_mail,
            notificationWebsite: response.notification_website
          });
        }
      },
      error => {
        console.error('Erreur lors du chargement des paramètres utilisateur', error);
        // Traiter l'erreur selon les besoins
      }
    );
  }
  

  updateSettings(): void {
    const formValue = this.settingsForm.value;
  
    this.usersService.updateUserSettings(this.id_user, formValue.notificationMail, formValue.notificationWebsite)
      .subscribe(
        (response: any) => {
          if (response) {
            const updateMessage = response.message;
  
            if (updateMessage) {
              const statusCode = response.status_code;
              console.log(updateMessage); // 'Salle de classe mise à jour avec succès.'
              console.log(statusCode); // 200
  
              if (statusCode === 200) {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Modification des paramètres réussie',
                  detail: updateMessage,
                });
              } else {
                this.messageService.add({
                  severity: 'error',
                  summary: 'Échec de la modification des paramètres',
                  detail: updateMessage,
                });
              }
            } else {
              console.error('La propriété "message" est manquante dans la réponse.');
            }
          } else {
            console.error('Réponse ou élément de réponse manquant.');
          }
        },
        (error) => {
          console.error('Erreur lors de la mise à jour des paramètres', error);
        }
      );
  }

}
