import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CourseService } from 'src/app/core/services/courses.service';
import { Course } from 'src/app/core/models/course.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeachersService } from 'src/app/core/services/teachers.service';
import { ClassroomsService } from 'src/app/core/services/classrooms.service';
import { Classroom } from 'src/app/core/models/classroom.model';
import { Teacher } from 'src/app/core/models/teachers.model';

@Component({
  selector: 'app-course-details-modal',
  templateUrl: './course-details-modal.component.html',
  // ... styles, etc.
})
export class CourseDetailsModalComponent implements OnInit {
  isLoading: boolean = true;

  @Input() selectedCourseId: number | null = null;
  display: boolean = true;
  course!: any;
  @Output() close = new EventEmitter<void>(); // Emit when the modal closes
  @Output() courseDeleted = new EventEmitter<number>();
  editMode: boolean = false;
  editCourseForm!: FormGroup;

  classrooms: any[] = [];
  teachers: any[] = [];
  selectedTeacherIds: number[] = [];
  selectedClassroomIds: number[] = [];

  constructor(
    private courseService: CourseService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private changeDetectorRef: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private teachersService: TeachersService,
    private classroomsService: ClassroomsService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadCourseDetails();
  }

  initializeForm(): void {
    this.editCourseForm = this.formBuilder.group({
      dateCourse: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      resource: ['', Validators.required],
      teachers: [[]], // Pour la pré-sélection, nous utilisons un tableau d'ID.
      classroom: [[]], // Pareil pour les salles de classe.
    });
  }

  loadCourseDetails(): void {
    if (this.selectedCourseId) {
      this.courseService.getCourseById(this.selectedCourseId).subscribe(
        (course) => {
          this.course = course.courses;
          console.log('course', this.course);

          // Déterminer le type de groupe et son ID
          let groupType = '';
          let groupId = null;
          if (this.course.promotion && this.course.promotion.length > 0) {
            groupId = this.course.promotion[0];
            groupType = 'promotion';
          } else if (this.course.training && this.course.training.length > 0) {
            groupId = this.course.training[0];
            groupType = 'training';
          } else if (this.course.td && this.course.td.length > 0) {
            groupId = this.course.td[0];
            groupType = 'td';
          } else if (this.course.tp && this.course.tp.length > 0) {
            groupId = this.course.tp[0];
            groupType = 'tp';
          }

          // Récupérer le nom du groupe
          if (groupId != null && groupType !== '') {
            this.courseService.getGroupName(groupId, groupType).subscribe(
              (groupName: any) => {
                this.course.groupName = groupName;
                this.changeDetectorRef.detectChanges();
              },
              (error) =>
                console.error(
                  `Erreur lors de la récupération du nom de ${groupType}`,
                  error
                )
            );
          }
          if (this.course.teacher && this.course.classroom) {
            const teacherIds = this.course.teacher.map((t: any) => t.id);
            const classroomIds = this.course.classroom.map((c: any) => c.id);
            console.log('teacherIds', teacherIds);
            console.log('classroomIds', classroomIds);
            // Mettez à jour le formulaire avec les données chargées
            this.editCourseForm.patchValue({
              teachers: teacherIds,
              classroom: classroomIds,
              // Autres champs si nécessaire...
            });
            console.log('editCourseForm', this.editCourseForm);
          }

          this.classroomsService.getClassrooms().subscribe(
            (data: Classroom[]) => {
              this.classrooms = data.map((classroom) => ({
                label: `${classroom.name} - (Capacité: ${classroom.capacity})`,
                id: classroom.id,
              }));
            },
            (error) => {
              console.error('Error loading data:', error);
            }
          );

          // Après avoir récupéré les données des enseignants :
          this.teachersService.getAllTeachers().subscribe((data: Teacher[]) => {
            this.teachers = data.map((teacher: any) => ({
              label: `${teacher.user.first_name} ${teacher.user.last_name}`,
              value: teacher.personal_info.id,
            }));

            // Synchronisez les ID pré-sélectionnés avec les nouvelles options des enseignants
            this.selectedTeacherIds = this.course.teacher.map((t: any) => t.id);

            // Mettez à jour le formulaire avec les données chargées
            this.editCourseForm.patchValue({
              teachers: this.selectedTeacherIds,
              // Autres champs si nécessaire...
            });
          });

          console.log(this.editCourseForm);

          this.isLoading = false;
        },
        (error) => {
          console.error('Erreur lors de la récupération du cours', error);
          this.isLoading = false;
        }
      );
    }
  }

  onClose(): void {
    this.display = false; // Close the modal
    this.close.emit(); // Notify the parent component
  }

  onDelete(): void {
    // La logique pour confirmer et supprimer le cours
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer ce cours ?',
      header: 'Confirmation de suppression',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // Perform the actual deletion logic
        this.courseService.deleteCourse(this.course.courses.id).subscribe(
          (response) => {
            console.log('Cours supprimé', response);
            this.display = false;
            this.messageService.add({
              severity: 'success',
              summary: 'Suppression réussie',
              detail: 'Le cours a été supprimé avec succès.',
            });
            this.courseDeleted.emit(this.course.courses.id);
            // Vous pourriez émettre un événement ou appeler une autre méthode pour informer le composant parent
          },
          (error) => {
            console.error('Erreur lors de la suppression du cours', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Erreur',
              detail: 'Une erreur est survenue lors de la suppression.',
            });
          }
        );
      },
      reject: () => {
        // Handle rejection action, if necessary
      },
    });
  }
  onEdit(): void {
    this.editMode = true;
    this.editCourseForm.patchValue({
      dateCourse: this.course?.courses?.dateCourse,
      startTime: this.course?.courses?.startTime,
      endTime: this.course?.courses?.endTime,
      resource: this.course?.resource?.id,
      teachers: this.course?.teacher.map((t: any) => t.id), // Assumant un tableau d'IDs
      classroom: this.course?.classroom?.id,
    });
  }

  onSave(): void {
    if (this.editCourseForm.valid) {
      const updatedCourse = this.editCourseForm.value;
      // Appeler le service pour mettre à jour le cours
      // ...
    }
  }

  cancelEdit(): void {
    this.editMode = false;
  }
}
