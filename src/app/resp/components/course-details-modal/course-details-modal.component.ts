import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CourseService } from 'src/app/core/services/courses.service';
import { Course } from 'src/app/core/models/course.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeachersService } from 'src/app/core/services/teachers.service';
import { ClassroomsService } from 'src/app/core/services/classrooms.service';
import { Classroom } from 'src/app/core/models/classroom.model';
import { Teacher } from 'src/app/core/models/teachers.model';
import { RessourceService } from 'src/app/core/services/ressources.service';

@Component({
  selector: 'app-course-details-modal',
  templateUrl: './course-details-modal.component.html',
  // ... styles, etc.
})
export class CourseDetailsModalComponent implements OnInit, OnChanges {
  @Input() selectedCourse: any;
  @Output() courseUpdated = new EventEmitter<{
    updatedCourse: any;
    groupType: string;
  }>();

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
  resources: any[] = [];
  constructor(
    private courseService: CourseService,
    private confirmationService: ConfirmationService,
    private resourceService: RessourceService,
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
  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedCourse'] && changes['selectedCourse'].currentValue) {
      this.course = changes['selectedCourse'].currentValue;
      this.initializeForm();
    }
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
    this.editCourseForm.patchValue({
      dateCourse: this.course?.courses?.dateCourse,
      startTime: this.course?.courses?.startTime,
      endTime: this.course?.courses?.endTime,
      resource: this.course?.resource?.id,
      teachers: this.course?.teacher.map((t: any) => t.id), // Assumant un tableau d'IDs
      classroom: this.course?.classroom?.id,
    });
  }

  loadCourseDetails(): void {
    if (this.selectedCourse) {
      this.course = this.selectedCourse;

      console.log('course', this.course);

      this.resourceService
        .getRessourceByRessourceTraining(this.course.resource.id)
        .subscribe(
          (data: any) => {
            this.resources = data;
            this.updateFormWithPreselectedValues();
            this.changeDetectorRef.detectChanges();
          },
          (error: any) => {
            console.error('Error loading resources:', error);
          }
        );

      if (this.course.teacher) {
        const teacherIds = this.course.teacher.map((t: any) => t.id);
        console.log('teacherIds', teacherIds);
        this.updateFormWithPreselectedValues();
        this.changeDetectorRef.detectChanges();
      }
      if (this.course.classroom) {
        const classroomIds = this.course.classroom.map((c: any) => c.id);
        console.log('classroomIds', classroomIds);
        this.updateFormWithPreselectedValues();
        this.changeDetectorRef.detectChanges();
      }

      this.classroomsService.getClassrooms().subscribe(
        (data: Classroom[]) => {
          this.classrooms = data.map((classroom) => ({
            label: `${classroom.name} - (Capacité: ${classroom.capacity})`,
            id: classroom.id,
          }));
          this.selectedClassroomIds = this.course.classroom.map(
            (c: any) => c.id
          );
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
      });

      console.log(this.editCourseForm);
    }
  }

  mapSelectedTeachersToOptions(selectedTeacherIds: number[]): any[] {
    return selectedTeacherIds.map((teacherId) => {
      const teacherOption = this.teachers.find(
        (teacher) => teacher.value === teacherId
      );
      if (teacherOption) {
        return teacherOption;
      }
      return null; // Gérer le cas où l'enseignant n'est pas trouvé (éventuellement)
    });
  }

  mapSelectedClassroomsToOptions(selectedClassroomIds: number[]): any[] {
    return selectedClassroomIds.map((classroomId) => {
      const classroomOption = this.classrooms.find(
        (classroom) => classroom.id === classroomId
      );
      if (classroomOption) {
        return classroomOption;
      }
      return null; // Gérer le cas où la salle de classe n'est pas trouvée (éventuellement)
    });
  }

  updateFormWithPreselectedValues() {
    // Vérifiez si les données du cours sont disponibles et si les options sont chargées
    if (
      this.course &&
      this.resources.length &&
      this.teachers.length &&
      this.classrooms.length
    ) {
      const selectedTeachersOptions = this.mapSelectedTeachersToOptions(
        this.selectedTeacherIds
      );
      const selectedClassroomsOptions = this.mapSelectedClassroomsToOptions(
        this.selectedClassroomIds
      );

      this.editCourseForm.patchValue({
        resource: this.course.resource.id,
        teachers: selectedTeachersOptions,
        classroom: selectedClassroomsOptions,
        // ... autres champs
      });
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
  }

  onSave(): void {
    if (this.editCourseForm.valid) {
      console.log(this.course);
      const formValue = this.editCourseForm.value;

      // Transform the data to match API expectations
      const selectedDate = new Date(formValue.dateCourse);
      const formattedDate = `${selectedDate.getFullYear()}-${
        selectedDate.getMonth() + 1
      }-${selectedDate.getDate()}`;

      let id_td = null;
      let id_tp = null;
      let id_training = null;
      let id_promotion = null;

      // Conditionally set fields based on course.group.type
      switch (this.course.groupType) {
        case 'td':
          id_td = this.course.td[0]; // Assuming group has an id attribute
          break;
        case 'tp':
          id_tp = this.course.tp[0];
          break;
        case 'training':
          id_training = this.course.training[0];
          break;
        case 'promotion':
          id_promotion = this.course.promotion[0];
          break;
        // Add other cases as needed
      }

      const updatedCourseData = {
        ...formValue,
        id_resource: formValue.resource, // Rename resource to id_resource
        teachers: formValue.teachers.map((t: any) => t.value), // Extract teacher IDs
        classrooms: formValue.classroom.map((c: any) => c.id), // Extract classroom IDs

        // Set additional fields if required
        control: false, // Example, set control to true
        id_td,
        id_tp,
        id_training,
        id_promotion,
      };

      updatedCourseData.dateCourse = formattedDate;
      // Remove fields not needed by the API
      delete updatedCourseData.resource;
      delete updatedCourseData.classroom;
      const courseId = this.course.courses.id;

      console.log('updatedCourseData', updatedCourseData);

      this.courseService.updateCourse(courseId, updatedCourseData).subscribe(
        (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Succès',
            detail: 'Le cours a été mis à jour avec succès.',
          });

          // Fetch the updated course data
          this.courseService.getCourseById(courseId).subscribe(
            (updatedCourse) => {
              console.log('updatedCourse', updatedCourse);

              this.courseUpdated.emit({
                updatedCourse: updatedCourse,
                groupType: this.course.groupType,
              });

              this.close.emit(); // Close the modal after successful update
            },
            (error) => {
              console.error(
                'Erreur lors de la récupération du cours mis à jour:',
                error
              );
              this.messageService.add({
                severity: 'error',
                summary: 'Erreur',
                detail: 'Erreur lors de la récupération du cours mis à jour.',
              });
            }
          );
        },
        (error) => {
          console.error('Erreur lors de la mise à jour du cours:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail: 'Erreur lors de la mise à jour du cours.',
          });
        }
      );
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Please fill in all required fields.',
      });
      // Handle the case where the form is not valid
    }
  }

  cancelEdit(): void {
    this.editMode = false;
  }
}
