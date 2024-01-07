import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { TeachersService } from 'src/app/core/services/teachers.service';

@Component({
  selector: 'app-hours-by-promotion',
  templateUrl: './hours-by-promotion.component.html',
  styleUrls: ['./hours-by-promotion.component.scss']
})
export class HoursByPromotionComponent implements OnInit {

  id_user!: number;
  id_teacher!: number;

  totalHours!: number;       // Total des heures pour la promo sélectionnée
  hoursPassed!: number;     // Heures effectuées
  hoursLeft!: number;       // Heures restantes

  promotions: any[] = [];
  selectedPromotion!: any;

  constructor(private teachersService: TeachersService, private authService: AuthService)  {
    
  }

  ngOnInit(): void {
    this.loadPromotions();
  }

  private loadPromotions(): void {
    this.teachersService.getIdTeacherByIdUser(this.authService.getUserId()).subscribe(data => {

      this.id_teacher = data.id_Teacher;

      this.teachersService.getTeacherPromotions(this.id_teacher).subscribe(response => {

        if (Array.isArray(response.data)) {
          this.promotions = response.data.map((promotion: any) => ({
            name: `${promotion.degree_name} ${promotion.level} - ${promotion.year}`,
            id: promotion.id
          }));
        } else {
          console.error('Data.data is not an array:', response.data);
          this.promotions = []; 
        }

      });

    });

  }
  
  

  private calculateHours(promotion_id: number): void {
    this.teachersService.getIdTeacherByIdUser(this.authService.getUserId()).subscribe(data => {

      this.id_teacher = data.id_Teacher;
      
      this.teachersService.getHoursByPromotion(this.id_teacher, promotion_id).subscribe(data => {
        this.totalHours = data.hours_worked; 
      });
  
      this.teachersService.getLeftHoursByPromotion(this.id_teacher, promotion_id).subscribe(data => {
        this.hoursLeft = data.hours_left;
      });

      this.teachersService.getPassedHoursByPromotion(this.id_teacher, promotion_id).subscribe(data => {
        this.hoursPassed = data.hours_passed; 
      });
      
    });
  }

  updateHours(): void {
    if (this.selectedPromotion !== null) {
      this.calculateHours(this.selectedPromotion);
    }
  }
  
}
