import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Training } from 'src/app/core/models/cohort-training.model';
import { CohortService } from 'src/app/core/services/cohort.service';
import { SingleTD } from 'src/app/core/models/single-td.model';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss'],
  styles: [
    `
      :host ::ng-deep .p-tabview-panels {
        padding: 0;
        padding-top: 1.5em;
      }
      :host ::ng-deep th {
        background-color: transparent !important;
      }
    `,
  ],
})
export class TrainingComponent implements OnInit {
  trainingInfo!: Training;

  isAddTDDialogVisible: boolean = false; // Pour contrôler l'affichage du modal
  newTDName: string = '';

  constructor(
    private route: ActivatedRoute,
    private cohortService: CohortService
  ) { }

  ngOnInit() {
    // Récupérer les informations de la formation (degree) depuis l'API
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.cohortService.getTrainingInfo(id).subscribe(
          (data) => {
            this.trainingInfo = data; // Stockez les données reçues dans la variable
            // console.log(this.degreeInfo);  // Affichez les données dans la console pour vérifier
          },
          (error) => {
            console.error(
              'Erreur lors de la récupération des informations de degree:',
              error
            );
          }
        );
      }
    });
  }


  // Méthode pour ajouter un TD
  addTD() {
    // Créer un nouvel objet TD
    const newTD: SingleTD = {
      id: 0, // ID sera défini par le serveur
      name: this.newTDName,
      id_promotion: this.trainingInfo.promotion.id, // ou la propriété appropriée
      id_training: this.trainingInfo.id // ou la propriété appropriée
    };

    // Appeler l'API pour ajouter le nouveau TD
    this.cohortService.addTD(newTD).subscribe(
      response => {
        // Gérer l'ajout réussi
        this.trainingInfo.tds.push(response); // Mettre à jour la liste locale des TDs
        this.isAddTDDialogVisible = false; // Fermer le dialogue
        this.newTDName = ''; // Réinitialiser le nom du TD
      },
      error => {
        // Gérer l'erreur
        console.error("Erreur lors de l'ajout du TD: ", error);
      }
    );
  }
}
