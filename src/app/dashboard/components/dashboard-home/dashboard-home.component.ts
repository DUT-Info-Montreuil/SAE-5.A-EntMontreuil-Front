import { Component } from '@angular/core';
import { ModalService } from 'src/app/core/services/modal.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent {
  constructor(private modalService: ModalService) { }

  openDangerModal() {
    this.modalService.openModal({
      id: 'dangerModal',  // Assurez-vous que cet ID correspond à un ModalComponent dans votre template
      type: 'danger',
      title: 'Opération échouée',
      description: 'Vous avez raté',
      buttons: [
        { text: 'Fermer', action: () => this.modalService.closeModal(), type: 'danger' },
        // Autres boutons selon les besoins
      ]
    });
  }

  openSuccessModal() {
    this.modalService.openModal({
      id: 'successModal',  // Assurez-vous que cet ID correspond à un ModalComponent dans votre template
      type: 'success',
      title: 'Opération réussie',
      description: 'Vous avez réussi',
      buttons: [
        { text: 'Désactiver', action: () => this.modalService.closeModal(), type: 'danger' },
        { text: 'Annuler', action: () => this.modalService.closeModal(), type: 'cancel' },
        // Autres boutons selon les besoins
      ]
    });
  }
}
