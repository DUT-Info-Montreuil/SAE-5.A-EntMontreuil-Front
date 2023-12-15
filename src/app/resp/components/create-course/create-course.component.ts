import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { parseISO } from 'date-fns';
import { MessageService } from 'primeng/api';
import { Degree } from 'src/app/admin/models/degree.model';
import { Promotion } from 'src/app/admin/models/promotion.model';
import { Training } from 'src/app/admin/models/training.model';
import { Classroom } from 'src/app/core/models/classroom.model';
import { Teacher } from 'src/app/core/models/teachers.model';
import { ClassroomsService } from 'src/app/core/services/classrooms.service';
import { CourseService } from 'src/app/core/services/courses.service';
import { RessourceService } from 'src/app/core/services/ressources.service';
import { TeachersService } from 'src/app/core/services/teachers.service';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss'],
})
export class CreateCourseComponent implements OnInit {
  @Input() degrees: Degree[] = [];
  @Input() promotions: Promotion[] = [];
  @Output() eventCreated = new EventEmitter<any>();
  filteredPromotions: any[] = [];
  date: string = '';
  startTime: string = '';
  endTime: string = '';
  selectedDegreeId: number | null = null;
  selectedPromotionId: number | null = null;
  selectedTrainingId: number | null = null;
  selectedClassroomId: number | null = null;
  classrooms: any[] = [];
  trainings: Training[] = [];
  teachers: any[] = [];
  teachersDropdownOptions: any[] = [];
  resources: any[] = [];
  selectedResourceId: number | null = null; // Stocker l'ID de la ressource sélectionnée
  control: boolean = false;

  selectedTeacherId: number | null = null;

  constructor(
    private courseService: CourseService,
    private classroomsService: ClassroomsService,
    private teachersService: TeachersService,
    private ressourceService: RessourceService,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {
    console.log(this.degrees);
    console.log(this.promotions);
    this.classroomsService.getClassrooms().subscribe(
      (data: Classroom[]) => {
        this.classrooms = data;
        console.log(this.classrooms);
      },
      (error) => {
        console.error('Error loading data:', error);
      }
    );

    this.teachersService.getAllTeachers().subscribe((data: any) => {
      this.teachers = data.map((teacherObj: any) => teacherObj);
      this.prepareTeachersDropdownOptions();
      console.log(this.teachers);
    });
  }

  prepareTeachersDropdownOptions() {
    this.teachersDropdownOptions = this.teachers.map((teacher: any) => ({
      label: `${teacher.user.first_name} ${teacher.user.last_name}`,
      value: teacher.personal_info.id,
    }));
  }
  getTrainingOfPromo(promotionId: number) {
    console.log('getTrainingOfPromo');
    this.courseService.getTrainingOfPromo(promotionId).subscribe((data) => {
      // Handle the retrieved training data here, e.g., assign it to this.trainings

      this.trainings = data.trainings;
    });
  }

  resetForm() {
    this.date = '';
    this.startTime = '';
    this.endTime = '';
  }

  onDegreeChange(id_Degree: number) {
    this.selectedPromotionId = null; // Réinitialiser l'ID de promotion sélectionnée
    this.selectedDegreeId = id_Degree; // Mise à jour de l'ID de diplôme sélectionné
    console.log(this.promotions);
    this.filteredPromotions = this.promotions.filter(
      (promo) => promo.id_Degree === id_Degree
    );
  }

  onPromotionChange(promotionId: number) {
    this.selectedPromotionId = promotionId; // Mise à jour de l'ID de promotion sélectionnée
    this.selectedTrainingId = null; // Réinitialiser l'ID de formation sélectionnée

    if (promotionId !== null) {
      this.getTrainingOfPromo(promotionId);
    } else {
      this.trainings = []; // Réinitialiser les formations si aucune promotion n'est sélectionnée
    }
  }

  onTrainingChange(trainingId: number) {
    this.selectedTrainingId = trainingId;

    if (trainingId !== null) {
      this.ressourceService.getRessourceByIdTraining(trainingId).subscribe(
        (data: any) => {
          this.resources = data;
        },
        (error: any) => {
          console.error('Error loading resources:', error);
        }
      );
    } else {
      this.resources = []; // Réinitialiser les ressources si aucune formation n'est sélectionnée
    }
  }

  onTeacherChange(teacherId: number) {
    this.selectedTeacherId = teacherId;
    // Ajoutez ici toute autre logique nécessaire lors de la sélection d'un enseignant
  }

  onResourceChange(resourceId: number) {
    this.selectedResourceId = resourceId;
    console.log(this.selectedResourceId);
  }
  onClassroomChange(classroomId: number) {
    this.selectedClassroomId = classroomId;
    console.log(this.selectedClassroomId);
    // Ajoutez ici toute autre logique nécessaire lors de la sélection d'une salle de classe
  }
  CreateCourse() {
    const newCourse = {
      startTime: this.startTime,
      endTime: this.endTime,
      dateCourse: this.date,
      control: this.control,
      id_resource: this.selectedResourceId, // Assurez-vous d'avoir cette propriété
      id_promotion: this.selectedPromotionId, // Ou l'identifiant approprié
      teachers_id: this.selectedTeacherId ? [this.selectedTeacherId] : [],
      classrooms_id: this.selectedClassroomId ? [this.selectedClassroomId] : [],
    };
    const selectedTeacher = this.teachers.find(
      (t) => t.personal_info.id === this.selectedTeacherId
    );
    const selectedClassroom = this.classrooms.find(
      (c) => c.id === this.selectedClassroomId
    );
    const selectedResource = this.resources.find(
      (r) => r.id === this.selectedResourceId
    );

    const teacherName = selectedTeacher
      ? `${selectedTeacher.user.first_name} ${selectedTeacher.user.last_name}`
      : 'Unassigned';
    const classroomName = selectedClassroom
      ? selectedClassroom.name
      : 'No Classroom Assigned';

    const resourceName = selectedResource
      ? selectedResource.name
      : 'Unknown Resource';
    const resourceColor = selectedResource ? selectedResource.color : '#000000'; // Default color

    console.log('newCourse', newCourse);

    this.courseService.addCourse(newCourse).subscribe(
      (response) => {
        console.log('Cours créé avec succès', response);
        // Gérer la réponse ou les actions de succès ici
        const calendarEvent = {
          title: response.name || 'Nouveau cours', // Using 'name' from response for the title
          start: parseISO(`${this.date}T${this.startTime}`), // Ensure the date strings are converted to Date objects
          end: parseISO(`${this.date}T${this.endTime}`),
          color: {
            primary: resourceColor, // Setting the primary color
            secondary: '#f0e68c', // You might want to set a secondary color as well
          },
          meta: {
            resourceName: resourceName,
            groupName: 'promotion', // Assuming this is a static value
            teacherNames: teacherName,
            classroomName: classroomName,
          },
        };

        this.eventCreated.emit(calendarEvent);

        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Le cours a été créé avec succès.',
        });
      },
      (error) => {
        console.error('Erreur lors de la création du cours', error);
        let errorMessage =
          'Une erreur s’est produite lors de la création du cours.';

        // Vérifiez si l'erreur contient un message spécifique
        if (error.error && error.error.error) {
          errorMessage = error.error.error;
        }
        console.log('errorMessage', errorMessage);
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: errorMessage,
        });
      }
    );
  }
}
