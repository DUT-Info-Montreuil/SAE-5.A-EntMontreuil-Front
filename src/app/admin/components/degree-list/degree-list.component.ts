import { Component, OnInit } from '@angular/core';
import { Degree } from '../../models/degree.model'; // Assurez-vous que le chemin est correct
import { DegreeService } from 'src/app/core/services/degrees.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-degree-list',
  templateUrl: './degree-list.component.html',
  styleUrls: ['./degree-list.component.scss'],
})
export class DegreeListComponent implements OnInit {
  degrees: Degree[] = [];
  filteredDegrees: Degree[] = [];
  searchQuery: string = '';
  displayCreateDegreeDialog: boolean = false;

  constructor(
    private degreeService: DegreeService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.refreshDegrees();
  }

  refreshDegrees(): void {
    this.degreeService.getAllDegrees().subscribe((degrees) => {
      this.degrees = degrees.sort((a, b) => a.id - b.id);
      this.filteredDegrees = [...this.degrees];
    });
  }

  onSearch(): void {
    if (!this.searchQuery) {
      this.filteredDegrees = this.degrees;
    } else {
      this.filteredDegrees = this.degrees.filter((degree) =>
        degree.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }

  deleteDegree(id: number): void {
    this.degreeService.deleteDegree(id).subscribe(
      (response: any) => {
        if (response[1] === 200) {
          this.degrees = this.degrees.filter((degree) => degree.id !== id);
          this.filteredDegrees = this.filteredDegrees.filter(
            (degree) => degree.id !== id
          );
          this.messageService.add({
            severity: 'success',
            summary: 'Suppression réussie',
            detail: 'La formation a été supprimée avec succès.',
          });

          // Utilisez la réponse complète de l'API si nécessaire
          console.log(
            "Réponse complète de l'API après suppression :",
            response
          );
        } else {
          if (response[1] === 401) {
            this.messageService.add({
              severity: 'error',
              summary: 'Erreur',
              detail:
                'Cette formation ne peut pas être supprimée car elle est référencée dans une promotion.',
            });

            return;
          } else {
            console.error(response.message);
            this.messageService.add({
              severity: 'error',
              summary: 'Erreur',
              detail: response.message,
            });
          }
        }
      },
      (error) => {}
    );
  }

  confirmDelete(degree: Degree): void {
    this.confirmationService.confirm({
      header: 'Supprimer',
      message: `Voulez-vous vraiment supprimer la formation « ${degree.name} » ?`,
      accept: () => {
        this.deleteDegree(degree.id);
      },
    });
  }

  // Dans DegreeListComponent
  startEditing(degree: Degree): void {
    degree.isEditing = true;
    degree.updatedName = degree.name;
  }

  stopEditing(degree: Degree): void {
    degree.isEditing = false;

    if (degree.updatedName !== degree.name) {
      this.confirmationService.confirm({
        header: 'Supprimer',
        message: `Voulez-vous vraiment modifier la formation « ${degree.name} » ?`,
        accept: () => {
          this.degreeService
            .updateDegree(degree.id, {
              name: degree.updatedName.trim(),
            })
            .subscribe(
              (response: any) => {
                console.log(response);
                // Handle success
                if (response[1] === 200) {
                  degree.name = degree.updatedName;
                  this.messageService.add({
                    severity: 'success',
                    summary: 'Succès',
                    detail: response[0].message,
                  });
                } else {
                  this.messageService.add({
                    severity: 'error',
                    summary: 'Erreur',
                    detail: response[0].message,
                  });
                }
              },
              (error) => {
                // Handle error
                console.error(
                  'Erreur lors de la mise à jour de la formation',
                  error
                );
              }
            );
        },
      });
    }
  }

  cancelEditing(degree: Degree): void {
    degree.isEditing = false;
  }
}
