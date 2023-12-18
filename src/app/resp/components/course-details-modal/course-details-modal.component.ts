import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CourseService } from 'src/app/core/services/courses.service';
import { Course } from 'src/app/core/models/course.model';

@Component({
  selector: 'app-course-details-modal',
  templateUrl: './course-details-modal.component.html',
  // ... styles, etc.
})
export class CourseDetailsModalComponent implements OnInit {
  @Input() selectedCourseId: number | null = null;
  display: boolean = true;
  course!: any;
  @Output() close = new EventEmitter<void>(); // Emit when the modal closes

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    console.log('selectedCourseId', this.selectedCourseId);
    if (this.selectedCourseId) {
      this.courseService.getCourseById(this.selectedCourseId).subscribe(
        (course) => {
          this.course = course.courses;
          console.log('course', this.course);
        },
        (error) => {
          console.error('Erreur lors de la récupération du cours', error);
        }
      );
    }
  }

  onClose(): void {
    this.display = false; // Close the modal
    this.close.emit(); // Notify the parent component
  }

  onEdit(): void {
    // La logique pour démarrer le processus de modification
  }

  onDelete(): void {
    // La logique pour confirmer et supprimer le cours
    if (confirm('Êtes-vous sûr de vouloir supprimer ce cours ?')) {
      this.courseService.deleteCourse(this.course.id).subscribe(
        (response) => {
          console.log('Cours supprimé', response);
          this.display = false;
          // Vous pourriez émettre un événement ou appeler une autre méthode pour informer le composant parent
        },
        (error) => {
          console.error('Erreur lors de la suppression du cours', error);
        }
      );
    }
  }
}
