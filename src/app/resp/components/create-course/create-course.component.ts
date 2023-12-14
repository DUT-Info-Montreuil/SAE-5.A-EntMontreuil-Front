import { Component, Input, OnInit } from '@angular/core';
import { Degree } from 'src/app/admin/models/degree.model';
import { Promotion } from 'src/app/admin/models/promotion.model';
import { CourseService } from 'src/app/core/services/courses.service';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss'],
})
export class CreateCourseComponent implements OnInit {
  @Input() degrees: Degree[] = [];
  @Input() promotions: Promotion[] = [];
  filteredPromotions: any[] = [];
  name: string = '';
  date: string = '';
  startTime: string = '';
  endTime: string = '';
  selectedDegreeId: number | null = null;
  selectedPromotionId: number | null = null;

  constructor(private courseService: CourseService) {}
  ngOnInit(): void {
    console.log(this.degrees);
    console.log(this.promotions);
  }

  addCourse() {
    // Création de l'objet cours
    const newCourse = {
      name: this.name,
      date: this.date,
      startTime: this.startTime,
      endTime: this.endTime,
      // Ajoutez ici d'autres propriétés nécessaires
    };
  }

  resetForm() {
    this.name = '';
    this.date = '';
    this.startTime = '';
    this.endTime = '';
  }

  onDegreeChange() {
    this.selectedPromotionId = null;
    this.filteredPromotions = this.promotions.filter(
      (promo) => promo.id_Degree === this.selectedDegreeId
    );
  }
}
