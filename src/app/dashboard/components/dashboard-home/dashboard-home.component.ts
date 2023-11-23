import { Component } from '@angular/core';
import { ModalService } from 'src/app/core/services/modal.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent {
  constructor(private modalService: ModalService) { }

  // Voici un exemple d'utilisation du service ModalService
  openAccountDeactivationModal() {
    this.modalService.openModal({
      id: 'accountDeactivateModal',
      type: 'danger',
      title: 'Désactiver votre compte',
      description: 'Êtes-vous sûr de vouloir désactiver votre compte ?',
      buttons: [
        { text: 'Désactiver', action: () => this.closeModal('accountDeactivateModal'), type: 'danger' },
        { text: 'Annuler', action: () => this.closeModal('accountDeactivateModal'), type: 'cancel' },
      ]
    });
  }

  closeModal(modalId: string) {
    // Obtenez la référence du modal spécifique et appelez sa méthode `close`
    console.log('close');
    let modal = this.modalService.getModalById(modalId);
    if (modal) {
      modal.close();
    }
  }
}
