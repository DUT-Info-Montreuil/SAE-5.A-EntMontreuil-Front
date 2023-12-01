import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Absence } from 'src/app/core/models/absence.model';
import { AbsencesService } from 'src/app/core/services/absences.service';

@Component({
  selector: 'app-justify-absence',
  templateUrl: './justify-absence.component.html',
  styleUrls: ['./justify-absence.component.scss'],
  providers: [MessageService],
  styles: [
    `
        :host ::ng-deep .p-fluid .p-fileupload .p-button {
            width: 100%;
            color: #495057;
            border: 1px solid #ced4da;
            background-color: white;
        }

        :host ::ng-deep .p-fluid .p-fileupload .p-button:hover {
            border-color: #3B82F6;
        }
    `
  ],
})
export class JustifyAbsenceComponent implements OnInit {

  @Input() selectedAbsence: Absence | null = null;
  @Input() displayJustifyModal: boolean = false;
  @Output() onClose = new EventEmitter<void>();

  justificationReason: string = '';
  justificationFile: File | null = null;

  constructor(
    private absencesService: AbsencesService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {

  }

  onFileUpload(event: any) {
    // Accédez à l'objet du fichier téléchargé
    const uploadedFiles = event.files;

    // Vous pouvez maintenant traiter ces fichiers comme vous le souhaitez
    // Par exemple, stockez le premier fichier dans votre variable justificationFile
    this.justificationFile = uploadedFiles.length > 0 ? uploadedFiles[0] : null;
  }

  onCancelButtonClick() {
    this.justificationReason = '';
    this.justificationFile = null;
    this.onClose.emit(); // Fermer le modal
  }

  submitJustification() {
    if (!this.selectedAbsence) {
      this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Aucune absence sélectionnée' });
      return;
    }

    /* // Ici, vous pouvez appeler votre service pour envoyer les données
    // Utilisez this.justificationReason et this.justificationFile pour obtenir les valeurs saisies par l'utilisateur
    this.absencesService.justifyAbsence(this.selectedAbsence.id, this.justificationReason, this.justificationFile).subscribe(
      response => {
        this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Absence justifiée' });
        this.onClose.emit(); // Fermer le modal
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la justification' });
      }
    ); */
  }

  convertirEtFormaterHeure(heureChaine: string): string {
    if (!heureChaine) return '';

    // Créer une date fictive, car seule l'heure nous intéresse
    const dateFictive = new Date(`1970-01-01T${heureChaine}`);

    return dateFictive.getHours().toString().padStart(2, '0') + 'h' + dateFictive.getMinutes().toString().padStart(2, '0');
  }

  calculateTimeDifference(start: string, end: string): string {
    const startDate = new Date(`1970-01-01T${start}`);
    const endDate = new Date(`1970-01-01T${end}`);

    const differenceInMs = endDate.getTime() - startDate.getTime();
    const hours = Math.floor(differenceInMs / (1000 * 60 * 60));
    const minutes = Math.floor((differenceInMs % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours}h${minutes.toString().padStart(2, '0')}`;
  }

}