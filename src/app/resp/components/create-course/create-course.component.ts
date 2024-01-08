import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { parseISO } from 'date-fns';
import { th } from 'date-fns/locale';
import { MessageService } from 'primeng/api';
import { Degree } from 'src/app/admin/models/degree.model';
import { Promotion } from 'src/app/admin/models/promotion.model';
import { Training } from 'src/app/admin/models/training.model';
import { Classroom } from 'src/app/core/models/classroom.model';
import { TD } from 'src/app/core/models/td.model';
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

  @Input() selectedPromotionId: number | null = null;
  @Input() selectedTrainingId: number | null = null;
  @Input() resources: any[] = [];
  @Input() selectedTdId: number | null = null;
  @Input() tds: TD[] = [];
  @Input() selectedTpId: number | null = null;
  date: string = '';
  startTime: string = '';
  endTime: string = '';

  classrooms: any[] = [];
  classroomsSave: any[] = [];
  trainings: Training[] = [];
  teachers: any[] = [];
  teachersDropdownOptions: any[] = [];
  control: boolean = false;

  selectedResourceId: number | null = null;
  selectedTeacherIds: number[] = [];
  selectedClassroomIds: number[] = [];

  constructor(
    private courseService: CourseService,
    private classroomsService: ClassroomsService,
    private teachersService: TeachersService,
    private ressourceService: RessourceService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.classroomsService.getClassrooms().subscribe(
      (data: Classroom[]) => {
        this.classroomsSave = data;
        this.classrooms = data.map((classroom) => ({
          label: `${classroom.name} - (Capacité: ${classroom.capacity})`,
          id: classroom.id,
        }));
      },
      (error) => {
        console.error('Error loading data:', error);
      }
    );

    this.teachersService.getAllTeachers().subscribe(
      (data: Teacher[]) => {
        this.teachers = data;
        this.prepareTeachersDropdownOptions();
      },
      (error) => {
        console.error('Error loading data:', error);
      }
    );
  }

  prepareTeachersDropdownOptions() {
    this.teachersDropdownOptions = this.teachers.map((teacher) => ({
      label: `${teacher.user.first_name} ${teacher.user.last_name}`,
      value: teacher.personal_info.id, // Ici, 'value' est l'ID de l'enseignant
    }));
  }

  getTrainingOfPromo(promotionId: number) {
    this.courseService.getTrainingOfPromo(promotionId).subscribe(
      (data) => {
        this.trainings = data.trainings;
      },
      (error) => {
        console.error('Error loading training data:', error);
      }
    );
  }

  resetForm() {
    this.date = '';
    this.startTime = '';
    this.endTime = '';
    this.selectedResourceId = null;
    this.selectedTeacherIds = [];
    this.selectedClassroomIds = [];
  }

  onPromotionChange(promotionId: number) {
    this.selectedPromotionId = promotionId;
    this.selectedTrainingId = null;
    this.trainings = [];
  }

  onTrainingChange(trainingId: number) {
    this.selectedTrainingId = trainingId;
    this.resources = [];
  }

  onTeacherChange(event: any) {
    console.log('selectedTeacherIds', this.selectedTeacherIds);
  }

  onClassroomChange(event: any) {
    console.log('selectedClassroomIds', this.selectedClassroomIds);
  }

  onResourceChange(resourceId: number) {
    this.selectedResourceId = resourceId;
  }

  CreateCourse() {
    if (!this.isValidCourseData()) {
      return;
    }
    console.log('techaer', this.selectedTeacherIds);
    console.log('classroom', this.selectedClassroomIds);
    // Convertir 'selectedTeacherIds' pour qu'il ne contienne que des IDs
    const teacherIds = this.selectedTeacherIds.map((teacher: any) => {
      return teacher.value ? teacher.value : teacher;
    });

    const classroomIds = this.selectedClassroomIds.map((classroom: any) => {
      return classroom.id ? classroom.id : classroom;
    });

    console.log('teacher IDs:', teacherIds);
    console.log('classroom IDs:', classroomIds);
    console.log(this.classrooms);
    var selectionType = this.selectedTpId
      ? 'TP'
      : this.selectedTdId
      ? 'TD'
      : this.selectedTrainingId && (!this.tds || this.tds.length === 0) // Vérifiez si tds est vide
      ? 'Promotion'
      : this.selectedTrainingId
      ? 'Training'
      : this.selectedPromotionId
      ? 'Promotion'
      : null;

    var newCourse: any = {
      startTime: this.startTime,
      endTime: this.endTime,
      dateCourse: this.date,
      control: this.control,
      id_resource: this.selectedResourceId,
      teachers_id: teacherIds,
      classrooms_id: classroomIds,
    };

    console.log('newCourse', newCourse);
    const teacherNames = teacherIds
      .map((id) => this.teachers.find((t: any) => t.personal_info.id === id))
      .map((t: any) => `${t.personal_info.initial}`)
      .join(', ');

    const classroomNames = classroomIds
      .map((id) => this.classrooms.find((c) => c.id === id))
      .filter((c) => c !== undefined) // Assurez-vous que la salle de classe existe
      .map((c) => c.name)
      .join(', ');
    const selectedResource = this.resources.find(
      (r) => r.id === this.selectedResourceId
    );

    const resourceName = selectedResource
      ? selectedResource.name
      : 'Unknown Resource';
    const resourceColor = selectedResource ? selectedResource.color : '#000000'; // Default color

    console.log('newCourse', this.teachers);
    console.log('id ressource', this.selectedResourceId);

    console.log('newCourse', newCourse);

    switch (selectionType) {
      case 'TD':
        newCourse['id_td'] = this.selectedTdId;
        break;
      case 'Training':
        newCourse['id_training'] = this.selectedTrainingId;

        break;
      case 'Promotion':
        newCourse['id_promotion'] = this.selectedPromotionId;

        break;
      case 'TP':
        newCourse['id_tp'] = this.selectedTpId;

        break;
      default:
        // Gérer le cas où aucune sélection n'est faite ou une logique par défaut
        break;
    }

    this.courseService.addCourse(newCourse).subscribe(
      (response: any) => {
        const classroom = classroomIds.map((id) => {
          return this.classroomsSave.find((c) => c.id === id);
        });
        const teacher = teacherIds.map((id) => {
          return this.teachers.find((t) => t.personal_info.id === id);
        });

        console.log('classroom add', classroom);
        console.log('teacher add', teacher);
        let course = {
          courses: {
            ...newCourse, // Inclut toutes les clés et valeurs de newCourse
            id: response.id, // Placeholder pour l'ID, sera défini lors de la création du cours
          },
          teacher: teacher,
          classroom: classroom,
          promotion:
            selectionType === 'Promotion' ? newCourse.id_promotion : null,
          resource: {
            name: resourceName,
            color: resourceColor,
            id: this.selectedResourceId,
          },
          td: selectionType === 'TD' ? newCourse.id_td : null,
          tp: selectionType === 'TP' ? newCourse.id_tp : null,
          training: selectionType === 'Training' ? newCourse.id_training : null,
        };

        switch (selectionType) {
          case 'TD':
            course.td = [this.selectedTdId]; // Ajouter l'ID du TD à la propriété 'td' de course
            break;
          case 'Training':
            course.training = [this.selectedTrainingId]; // Ajouter l'ID de la formation à la propriété 'training' de course
            break;
          case 'Promotion':
            course.promotion = [this.selectedPromotionId]; // Ajouter l'ID de la promotion à la propriété 'promotion' de course
            break;
          case 'TP':
            course.tp = [this.selectedTpId]; // Ajouter l'ID du TP à la propriété 'tp' de course
            break;
          default:
            // Gérer le cas où aucune sélection n'est faite ou une logique par défaut
            break;
        }

        console.log('Cours créé avec succès', response);
        // Gérer la réponse ou les actions de succès ici

        console.log('course bonus', course);
        const calendarEvent = {
          title: resourceName, // Using 'name' from response for the title
          start: parseISO(`${this.date}T${this.startTime}`), // Ensure the date strings are converted to Date objects
          end: parseISO(`${this.date}T${this.endTime}`),
          color: {
            primary: '#000000', // Setting the primary color
            secondary: resourceColor, // You might want to set a secondary color as well
          },
          meta: {
            course: course,
            courseid: response.id,
            resourceName: resourceName,
            teacherNames: teacherNames,
            classroomName: classroomNames,
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

  isValidCourseData(): boolean {
    if (
      !this.date ||
      !this.startTime ||
      !this.endTime ||
      !this.selectedResourceId
    ) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Veuillez remplir tous les champs requis.',
      });
      return false;
    }

    const startHour = parseInt(this.startTime.split(':')[0]);
    const endHour = parseInt(this.endTime.split(':')[0]);

    if (startHour < 8 || endHour > 20) {
      this.messageService.add({
        severity: 'error',
        summary: "Erreur d'horaire",
        detail: 'Le cours doit commencer après 8h et finir avant 20h.',
      });
      return false;
    }

    // Ajoutez ici d'autres vérifications si nécessaire

    return true;
  }
  getHeader(): string {
    if (this.selectedTpId) {
      return 'Créer un cours pour un TP';
    } else if (this.selectedTdId) {
      console.log('changement nom');
      return 'Créer un cours pour un TD';
    } else if (this.selectedTrainingId && this.tds && this.tds.length > 0) {
      return 'Créer un cours pour un parcours';
    } else {
      return 'Créer un cours pour une promotion';
    }
  }
}
