import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TrainingService } from 'src/app/core/services/trainings.service';
import { DegreeService } from 'src/app/core/services/degrees.service';
import { Training } from '../../models/training.model';
import { Degree } from '../../models/degree.model';

import { MessageService } from 'primeng/api';
import { Promotion } from '../../models/promotion.model';
import { PromotionsService } from 'src/app/core/services/promotions.service';
import { PromotionListComponent } from '../promotion-list/promotion-list.component';

@Component({
  selector: 'app-create-promotion',
  templateUrl: './create-promotion.component.html',
  styleUrls: ['./create-promotion.component.scss']
})
export class CreatePromotionComponent {
  @Input() displayCreatePromotionDialog: boolean = false;
  @Output() promotionCreated: EventEmitter<Promotion> =
    new EventEmitter<Promotion>();

  loading: boolean = false;
  selectedLevel: number = 1;
  selectedYear :number = 2023;
  selectedDegreeiD !:number;
  degrees !: any[]
  PromotionListComponent !: PromotionListComponent
  
  
  constructor(
    private promotionService: PromotionsService,
    private messageService: MessageService,
    private degreeService : DegreeService
  ) {}

  ngOnInit(): void {
    // Fetch the list of degrees for the dropdow
    this.showCreatePromotionDialog();
    this.degreeService.getAllDegrees_any().subscribe((data)=>{
      this.degrees = data;
      console.log(this.degrees)
      
    })
    
  }

  showCreatePromotionDialog(): void {
    this.displayCreatePromotionDialog = true;
  }

  closeCreatePromotionDialog(): void {
    this.displayCreatePromotionDialog = false;
  }

  isFormValid(): boolean {
    console.log()
    return (
      !!this.selectedLevel &&
      !!this.selectedDegreeiD &&
      !!this.selectedYear
      
    );
  }
  // ...

  // ...

  createPromotion(): void {
    console.log("degree"+this.selectedDegreeiD),
    console.log("anné" + this.selectedYear),
    console.log("level"+this.selectedLevel)
  
    this.loading = true;

    if (!this.isFormValid()) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail:
          'Veuillez saisir une année, une formation et un niveau.',
      });

      this.loading = false;
      return; // Sortez de la fonction si le formulaire n'est pas valide
    }
    this.promotionService.addPromotion(this.selectedYear, this.selectedLevel, this.selectedDegreeiD).subscribe(
      (response) => {
        this.messageService.add({
          severity: 'success', 
          summary: 'Succès', 
          detail: "Promotion ajouté avec succès",
        });
        this.displayCreatePromotionDialog = false;
        this.loading = false;
        this.PromotionListComponent.refreshPromotions()
      
      },
      (error) => {
        // Handle error, e.g., show an error toast
      }
    );
  }

}
