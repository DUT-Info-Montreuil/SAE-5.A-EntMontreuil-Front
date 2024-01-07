import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { TeachersService } from 'src/app/core/services/teachers.service';

@Component({
  selector: 'app-hours-by-promotion',
  templateUrl: './hours-by-promotion.component.html',
  styleUrls: ['./hours-by-promotion.component.scss']
})
export class HoursByPromotionComponent implements OnInit {

  @Input() year!: number;

  id_user!: number;
  id_teacher!: number;

  totalHours!: number;       // Total des heures pour la promo sélectionnée
  hoursPassed!: number;     // Heures effectuées
  hoursLeft!: number;       // Heures restantes

  ngOnInit(): void {

  }

}
