import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { RessourceService } from 'src/app/core/services/ressources.service';
import { TeachersService } from 'src/app/core/services/teachers.service';
@Component({
  selector: 'app-hours-by-resource',
  templateUrl: './hours-by-resource.component.html',
  styleUrls: ['./hours-by-resource.component.scss']
})
export class HoursByResourceComponent implements OnInit {

  id_user!: number;
  id_teacher!: number;

  totalHours!: number;      // Total des heures pour la ressource sélectionnée
  hoursPassed!: number;     // Heures effectuées
  hoursLeft!: number;       // Heures restantes

  resources: any[] = [];
  selectedResource: any;


  constructor(private teachersService: TeachersService, private authService: AuthService,private resourceService: RessourceService)  {
    
  }

  ngOnInit(): void {
    this.resourceService.getRessources().subscribe(data => {
      this.resources = data.map(resource => ({
        name: resource.name,
        id: resource.id
      }));
    });
  }

  private calculateHours(resource: number): void {
    this.teachersService.getIdTeacherByIdUser(this.authService.getUserId()).subscribe(data => {

      this.id_teacher = data.id_Teacher;
      
      this.teachersService.getHoursByResource(this.id_teacher, resource).subscribe(data => {
        this.totalHours = data.hours_worked; 
      });
  
      this.teachersService.getLeftHoursByResource(this.id_teacher, resource).subscribe(data => {
        this.hoursLeft = data.hours_left;
      });

      this.teachersService.getPassedHoursByResource(this.id_teacher, resource).subscribe(data => {
        this.hoursPassed = data.hours_passed; 
      });
      
    });
  }

  updateHours(): void {
    if (this.selectedResource) {
      this.calculateHours(this.selectedResource);
    }
  }
  


}