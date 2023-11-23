import { Component } from '@angular/core';
import { ModalService } from 'src/app/core/services/modal.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent {
  constructor(private modalService: ModalService) { }

  openAccountDeactivationModal() {
    this.modalService.openModal({
      id: 'accountDeactivateModal',
      type: 'success',
      title: 'Désactiver votre compte',
      description: 'Êtes-vous sûr de vouloir désactiver votre compte ?',
      buttons: [
        { text: 'Désactiver', action: () => this.modalService.closeModal(), type: 'danger' },
        { text: 'Annuler', action: () => this.modalService.closeModal(), type: 'cancel' },
      ]
    });
  }
}
