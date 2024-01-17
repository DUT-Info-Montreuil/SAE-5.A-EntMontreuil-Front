import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import {
  addDays,
  addWeeks,
  endOfWeek,
  format,
  parseISO,
  startOfWeek,
  subDays,
  subWeeks,
} from 'date-fns';
import { fr } from 'date-fns/locale';
import parse from 'date-fns/parse';
import { MessageService } from 'primeng/api';
import { Degree } from 'src/app/admin/models/degree.model';
import { Promotion } from 'src/app/admin/models/promotion.model';
import { Ressource } from 'src/app/admin/models/ressource.model';
import { Training } from 'src/app/admin/models/training.model';
import { Course } from 'src/app/core/models/course.model';
import { TD } from 'src/app/core/models/td.model';
import { TP } from 'src/app/core/models/tp.model';
import { CourseService } from 'src/app/core/services/courses.service';
import { DegreeService } from 'src/app/core/services/degrees.service';
import { RessourceService } from 'src/app/core/services/ressources.service';
import { TrainingService } from 'src/app/core/services/trainings.service';

@Component({
  selector: 'app-manage-courses',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './manage-courses.component.html',
  styleUrls: ['./manage-courses.component.scss'],
})
export class ManageCoursesComponent {
  selectedPromotionId: number | null = null;
  selectedTrainingId: number | null = null;
  selectedCourse: any;
  selectedTdId: number | null = null;
  selectedTpId: number | null = null;

  promotions: Promotion[] = [];
  filteredPromotions: Promotion[] = [];
  resources: any[] = [];
  degrees: Degree[] = [];
  trainings: Training[] = [];
  tds: TD[] = [];
  tps: TP[] = [];
  selectedSemester: number | null = null;
  semesterOptions: number[] = [1, 2, 3];

  // In ManageCoursesComponent class

  handleEventClick(event: CalendarEvent): void {
    console.log(event);
    this.selectedCourse = event.meta.course;

    // Assurez-vous que groupName existe dans event.meta
    if (event.meta && event.meta.groupName) {
      // Ajoutez groupName à selectedCourse
      this.selectedCourse.groupName = event.meta.groupName;
      this.selectedCourse.groupType = event.meta.groupType;
    }
  }

  view: CalendarView = CalendarView.Week;
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  copiedEvents: CalendarEvent[] = [];

  excludeDays: number[] = [0, 6]; // Exclure dimanche (0) et samedi (6)
  dayStartHour: number = 8;
  dayEndHour: number = 20;
  hourSegments: number = 2; // Pour avoir des incréments de 30 minutes
  weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6 = 1; // Semaine commence le lundi

  constructor(
    private courseService: CourseService,
    private changeDetectorRef: ChangeDetectorRef,
    private deegreeService: DegreeService,
    private ressourceService: RessourceService,
    private trainingService: TrainingService,
    private messageService: MessageService
  ) {
    this.courseService.getAllPromotions().subscribe((data) => {
      this.promotions = data.map((promo) => ({
        ...promo,
        uniqueLabel: `BUT${promo.level}:${promo.year} ${promo.degree_name}`,
      }));
    });
  }

  ngOnInit() {
    this.getDegrees();
  }
  addCourse(arg0: any, arg1: any, arg2: any, arg3: any) {
    throw new Error('Method not implemented.');
  }

  onPromotionChange() {
    this.selectedSemester = null;
    this.selectedTrainingId = null;
    this.selectedTdId = null;
    this.selectedTpId = null;
    this.resources = [];
    this.events = [];
    this.tds = [];
    this.tps = [];
    this.copiedEvents = [];

    if (this.selectedPromotionId !== null) {
      this.selectedTrainingId = null;
      // Trouvez la promotion sélectionnée et mettez à jour le niveau actuel
      const selectedPromotion = this.promotions.find(
        (promo) => promo.id === this.selectedPromotionId
      );
      if (selectedPromotion) {
        this.updateSemesterOptions(selectedPromotion.level);
      }
    }
  }

  handleDayClick(dayDate: Date): void {
    this.viewDate = dayDate;
    this.view = CalendarView.Day;
    this.changeDetectorRef.detectChanges();
  }

  switchToWeekView(): void {
    this.view = CalendarView.Week;
    this.changeDetectorRef.detectChanges();
  }

  updateSemesterOptions(level: number): void {
    switch (level) {
      case 1:
        this.semesterOptions = [1, 2];
        break;
      case 2:
        this.semesterOptions = [3, 4];
        break;
      case 3:
        this.semesterOptions = [5, 6];
        break;
      default:
        this.semesterOptions = []; // Ou toute autre valeur par défaut que vous souhaitez
        break;
    }
  }

  removeEvent(courseId: number): void {
    // Filter out the event with the given ID
    this.events = this.events.filter(
      (event) => event.meta.courseid !== courseId
    );
    this.changeDetectorRef.detectChanges(); // Since you're using OnPush change detection
  }

  onSemesterChange() {
    this.resources = [];
    this.events = [];
    this.selectedTrainingId = null;
    this.selectedTdId = null;
    this.selectedTpId = null;
    this.tds = [];
    this.tps = [];
    this.copiedEvents = [];
    if (this.selectedSemester && this.selectedPromotionId) {
      this.getTrainingOfPromo(this.selectedPromotionId, this.selectedSemester);
      this.courseService
        .getCourseByPromotion(this.selectedPromotionId, this.selectedSemester)
        .subscribe((data: any) => {
          this.events = [];
          this.processCourseData(data);
          this.events = this.removeDuplicateEvents(this.events);
        });
    }
    this.changeDetectorRef.detectChanges();
  }

  async processCourseData(data: any) {
    // Initialisation de this.events

    // Traitez chaque type de données de cours
    console.log('processCourseData');
    if (data.courses && data.courses.courses_promotion) {
      await this.createEventsFromCourses(data.courses.courses_promotion);
    }
    if (data.courses && data.courses.courses_training) {
      await this.createEventsFromCourses(data.courses.courses_training);
    }
    if (data.courses && data.courses.courses_td) {
      await this.createEventsFromCourses(data.courses.courses_td);
    }
    if (data.courses && data.courses.courses_tp) {
      await this.createEventsFromCourses(data.courses.courses_tp);
    }

    // Éliminer les doublons
    this.events = this.removeDuplicateEvents(this.events);

    // Déclencher la détection de changements
    this.changeDetectorRef.detectChanges();
  }

  removeDuplicateEvents(events: CalendarEvent[]): CalendarEvent[] {
    const uniqueEventIds = new Set();
    const uniqueEvents = events.filter((event) => {
      const courseid = event.meta.courseid;
      if (!uniqueEventIds.has(courseid)) {
        uniqueEventIds.add(courseid);
        return true;
      }
      return false;
    });
    return uniqueEvents;
  }

  onTrainingChange() {
    console.log('onTrainingChange');
    this.tds = [];
    this.tps = [];
    this.events = [];
    this.copiedEvents = [];
    this.selectedTdId = null;
    this.selectedTpId = null;
    if (
      this.selectedTrainingId !== null &&
      this.selectedPromotionId !== null &&
      this.selectedSemester !== null
    ) {
      this.fetchTDsByTrainingId(this.selectedTrainingId);
      this.ressourceService
        .getRessourceByIdTraining(this.selectedTrainingId)
        .subscribe(
          (data: any) => {
            this.resources = data;
            this.changeDetectorRef.detectChanges();
          },
          (error: any) => {
            console.error('Error loading resources:', error);
          }
        );
    }
  }

  getTrainingOfPromo(promotionId: number, idSemester: number) {
    console.log('getTrainingOfPromo');
    this.trainings = [];
    this.copiedEvents = [];
    this.courseService
      .getTrainingByPromotionAndSemester(promotionId, idSemester)
      .subscribe((data) => {
        // Handle the retrieved training data here, e.g., assign it to this.trainings
        console.log(data);
        this.trainings = data;
      });
    console.log(this.trainings);
  }

  getDegrees() {
    this.deegreeService.getAllDegrees().subscribe((data) => {
      this.degrees = data;
    });
  }
  onDegreeChange(degreeId: number) {
    this.selectedPromotionId = null;
    this.trainings = [];
    this.tds = [];
    this.tps = [];
    this.copiedEvents = [];
    this.selectedSemester = null;
    this.selectedTdId = null;
    this.selectedTrainingId = null;
    this.selectedTpId = null;
    this.events = [];
    this.filteredPromotions = this.promotions.filter(
      (promo) => promo.id_Degree === degreeId
    );
  }

  async handleCourseUpdated(eventData: {
    updatedCourse: any;
    groupType: string;
  }) {
    const { updatedCourse, groupType } = eventData;

    console.log(updatedCourse);
    this.events = this.events.filter(
      (event) => event.meta.courseid !== updatedCourse.courses.courses.id
    );

    console.log('Événements avant suppression :', this.events);
    // Supprimer l'ancien événement

    let coursesData: any = {
      courses: {
        courses_promotion: [],
        courses_training: [],
        courses_td: [],
        courses_tp: [],
      },
    };

    console.log(groupType);
    if (groupType === 'promotion') {
      coursesData.courses.courses_promotion.push(updatedCourse.courses);
    } else if (groupType === 'training') {
      coursesData.courses.courses_training.push(updatedCourse.courses);
    } else if (groupType === 'td') {
      coursesData.courses.courses_td.push(updatedCourse.courses);
    } else if (groupType === 'tp') {
      coursesData.courses.courses_tp.push(updatedCourse.courses);
    }

    await this.processCourseData(coursesData);
  }

  async createEventsFromCourses(coursesData: any) {
    let newEventsPromises = coursesData.map(async (courseData: any) => {
      const course: any = new Course(courseData); // Supposons que Course est une classe définie ailleurs
      course.dateCourse = courseData.courses.dateCourse;
      course.startTime = courseData.courses.startTime;
      course.endTime = courseData.courses.endTime;

      let groupName = '';
      let groupId = null;
      let groupType = '';
      if (course.promotion && course.promotion.length > 0) {
        groupId = course.promotion[0];
        groupType = 'promotion';
      } else if (course.training && course.training.length > 0) {
        groupId = course.training[0];
        groupType = 'training';
      } else if (course.td && course.td.length > 0) {
        groupId = course.td[0];
        groupType = 'td';
      } else if (course.tp && course.tp.length > 0) {
        groupId = course.tp[0];
        groupType = 'tp';
      }

      if (groupId != null && groupType !== '') {
        try {
          groupName = await this.courseService
            .getGroupName(groupId, groupType)
            .toPromise();
        } catch (error) {
          console.error(
            `Erreur lors de la récupération du nom de ${groupType}`,
            error
          );
        }
      }

      const startDateTime = `${course.dateCourse}T${course.startTime}`;
      const endDateTime = `${course.dateCourse}T${course.endTime}`;
      const startDate = parse(
        startDateTime,
        "yyyy-MM-dd'T'HH:mm:ss",
        new Date()
      );
      const endDate = parse(endDateTime, "yyyy-MM-dd'T'HH:mm:ss", new Date());

      return {
        title: course.resource.name,
        start: startDate,
        end: endDate,
        color: {
          primary: '#000000', // couleur par défaut
          secondary: course.resource.color || '#ffcc00',
        },
        meta: {
          control: courseData.courses.control,
          course: courseData,
          courseid: courseData.courses.id,
          resourceName: course.resource.name,
          teacherNames: course.teacher
            .map((t: any) => `${t.initial}`)
            .join(', '),
          classroomName: course.classroom.map((c: any) => c.name).join(', '),
          groupName: groupName,
          groupType: groupType,
          groupId: groupId,
        },
      };
    });

    const newEvents = await Promise.all(newEventsPromises);
    this.events.push(...newEvents);
    this.changeDetectorRef.detectChanges();
  }

  previous(): void {
    if (this.view === 'day') {
      this.viewDate = subDays(this.viewDate, 1);
    } else if (this.view === 'week') {
      this.viewDate = subWeeks(this.viewDate, 1);
    }
  }

  next(): void {
    if (this.view === 'day') {
      this.viewDate = addDays(this.viewDate, 1);
    } else if (this.view === 'week') {
      this.viewDate = addWeeks(this.viewDate, 1);
    }
  }

  addEvent(event: any) {
    // Vérifiez si 'this.calendarOptions.events' est un tableau
    // if (Array.isArray(this.calendarOptions.events)) {
    //   // Ajoutez le nouvel événement
    //   console.log(event);
    //   this.calendarOptions.events.push(event);
    //   this.changeDetectorRef.detectChanges();
    // } else {
    //   // Si ce n'est pas un tableau, initialisez-le en tant que tel avec le nouvel événement
    //   this.calendarOptions.events = [event];
    // }

    // this.changeDetectorRef.detectChanges();
    // console.log(this.calendarOptions.events);
    this.events = [...this.events, event];
    this.changeDetectorRef.detectChanges();
    console.log(this.events);
  }

  fetchTDsByTrainingId(trainingId: number): void {
    this.trainingService.getTDsByTrainingId(trainingId).subscribe(
      (data) => {
        this.tds = data;
        this.changeDetectorRef.detectChanges(); // Since using OnPush change detection
        console.log(this.tds);
        if (
          this.selectedTrainingId &&
          this.selectedSemester &&
          this.selectedPromotionId
        ) {
          if (this.tds.length > 0) {
            this.courseService
              .getCourseByTraining(this.selectedTrainingId)
              .subscribe((data: any) => {
                this.events = [];
                this.processCourseData(data);
              });
          } else {
            this.courseService
              .getCourseByPromotion(
                this.selectedPromotionId,
                this.selectedSemester
              )
              .subscribe((data: any) => {
                this.events = [];
                this.processCourseData(data);
                this.events = this.removeDuplicateEvents(this.events);
              });
          }
        }
      },
      (error) => {
        console.error('Error fetching TDs:', error);
      }
    );
    this.changeDetectorRef.detectChanges();
  }

  fetchTpsByTDId(tdId: number): void {
    this.trainingService.getTpsByTDID(tdId).subscribe(
      (data) => {
        this.tps = data;
        console.log('TPs fetched:', this.tps);
        console.log('TPs length:', this.tps.length);
        this.changeDetectorRef.detectChanges();
      },
      (error) => {
        console.error('Error fetching tps:', error);
      }
    );
  }

  onTdChange() {
    console.log('onTdChange - TD selected:', this.selectedTdId);
    this.selectedTpId = null;
    if (this.selectedTdId !== null) {
      this.events = [];
      this.copiedEvents = [];
      this.fetchTpsByTDId(this.selectedTdId);
      this.courseService
        .getCourseByTD(this.selectedTdId)
        .subscribe((data: any) => {
          this.events = [];
          this.processCourseData(data);
        });
    }
  }

  onTpChange() {
    console.log('onTpChange - TP selected:', this.selectedTpId);
    if (this.selectedTpId) {
      this.events = [];
      this.copiedEvents = [];
      this.courseService
        .getCourseByTp(this.selectedTpId)
        .subscribe((data: any) => {
          console.log(data);
          this.events = [];
          this.processCourseData(data);
        });
    }
  }

  copyEventsToCurrentWeek(): void {
    const currentStart = startOfWeek(this.viewDate, {
      weekStartsOn: this.weekStartsOn,
    });
    const currentEnd = endOfWeek(this.viewDate, {
      weekStartsOn: this.weekStartsOn,
    });

    this.copiedEvents = this.events.filter((event) => {
      const eventStart = new Date(event.start);
      const eventDay = eventStart.getDay();
      return (
        eventStart >= currentStart &&
        eventStart <= currentEnd &&
        !this.excludeDays.includes(eventDay)
      );
    });
    const formattedWeek = `Semaine du ${format(currentStart, 'dd MMMM', {
      locale: fr,
    })}`;
    console.log(`Événements copiés : ${formattedWeek}`);

    // Affichez le message avec la semaine spécifique
    this.messageService.add({
      severity: 'success',
      summary: 'Succès',
      detail: `Les cours de la ${formattedWeek} ont été copiés`,
    });
  }

  async pasteEventsFromClipboard() {
    if (!this.copiedEvents || this.copiedEvents.length === 0) {
      // Il n'y a pas d'événements copiés, ne rien faire
      return;
    }

    const currentDate = this.viewDate; // Date de la semaine actuellement affichée
    const targetWeekStart = startOfWeek(currentDate, {
      weekStartsOn: this.weekStartsOn,
    });
    const targetWeekEnd = endOfWeek(currentDate, {
      weekStartsOn: this.weekStartsOn,
    });

    const copiedEventsToPaste = this.copiedEvents.map((copiedEvent) => {
      const eventCopy = { ...copiedEvent };
      const eventStart = eventCopy.start;
      const eventEnd = eventCopy.end;

      // Vérifier si 'end' est défini, sinon, utilisez la date de début
      if (eventEnd) {
        // Ajouter la différence entre la date cible et la date source aux événements copiés
        const timeDifference =
          targetWeekStart.getTime() -
          startOfWeek(eventStart, {
            weekStartsOn: this.weekStartsOn,
          }).getTime();
        eventCopy.start = new Date(eventStart.getTime() + timeDifference);
        eventCopy.end = new Date(eventEnd.getTime() + timeDifference);
      } else {
        // Si 'end' n'est pas défini, utilisez la date de début pour la date de début et la fin
        eventCopy.start = targetWeekStart;
        eventCopy.end = new Date(
          targetWeekStart.getTime() +
            (eventStart.getTime() -
              startOfWeek(eventStart, {
                weekStartsOn: this.weekStartsOn,
              }).getTime())
        );
      }

      // Mise à jour de la dateCourse dans meta.course.course.dateCourse
      eventCopy.meta.course.courses.dateCourse = format(
        eventCopy.start,
        'yyyy-MM-dd'
      );

      return eventCopy;
    });

    // Ajouter les événements collés à la base de données
    for (const copiedEvent of copiedEventsToPaste) {
      await this.addEventToDatabase(copiedEvent);
    }

    this.changeDetectorRef.detectChanges();
  }

  async addEventToDatabase(copiedEvent: any): Promise<any> {
    try {
      if (!copiedEvent || !copiedEvent.meta) {
        // Vérifiez si 'copiedEvent' ou 'copiedEvent.meta' sont définis, sinon, ne rien faire
        return null;
      }

      const meta = copiedEvent.meta;

      // Utilisez parseISO pour analyser la date au format ISO8601
      const parsedDate = parseISO(meta.course.courses.dateCourse);

      const formattedDate = format(parsedDate, 'yyyy-MM-dd');
      const teacherIds = meta.course.teacher.map((teacher: any) => teacher.id);
      const classroomIds = meta.course.classroom.map(
        (classroom: any) => classroom.id
      );
      const resourceId = meta.course.resource.id;
      const startTime = meta.course.courses.startTime.slice(0, 5); // Supprimez les secondes
      const endTime = meta.course.courses.endTime.slice(0, 5); // Supprimez les secondes

      // Remplacez les propriétés suivantes par les données pertinentes de 'copiedEvent.meta'
      var courseData: any = {
        startTime: startTime,
        endTime: endTime,
        dateCourse: formattedDate,
        control: meta.course.courses.control,
        id_resource: resourceId,
        teachers_id: teacherIds,
        classrooms_id: classroomIds,
      };

      if (meta.groupType === 'promotion') {
        courseData.id_promotion = meta.groupId;
      } else if (meta.groupType === 'training') {
        courseData.id_training = meta.groupId;
      } else if (meta.groupType === 'td') {
        courseData.id_td = meta.groupId;
      } else if (meta.groupType === 'tp') {
        courseData.id_tp = meta.groupId;
      }

      console.log(courseData);
      this.courseService.addCourse(courseData).subscribe(
        (response: any) => {
          console.log(response);
          const newEvent = { ...copiedEvent }; // Créez une copie de l'événement
          newEvent.meta.courseid = response.id; // Mettez à jour l'ID du cours dans la copie de l'événement
          newEvent.meta.course.courses.id = response.id; // Mettez à jour meta.course.courses.id dans la copie de l'événement
          this.events = [...this.events, newEvent]; // Ajoutez la copie de l'événement à la liste des événements
          this.changeDetectorRef.detectChanges();
          console.log(this.events);
        },
        (error) => {
          console.error('Erreur lors de la création du cours', error);
          let errorMessage =
            'Une erreur s’est produite lors de la création du cours.';
          // Gérez les erreurs de création du cours ici
          // Vous pouvez afficher un message d'erreur à l'utilisateur ou effectuer d'autres actions nécessaires
          // En cas d'erreur, vous pouvez retourner null ou gérer l'erreur différemment selon vos besoins
        }
      );
    } catch (error) {
      console.error('Erreur lors de la création du cours', error);
      let errorMessage =
        'Une erreur s’est produite lors de la création du cours.';

      // Gérez les erreurs de création du cours ici
      // Vous pouvez afficher un message d'erreur à l'utilisateur ou effectuer d'autres actions nécessaires
      // En cas d'erreur, vous pouvez retourner null ou gérer l'erreur différemment selon vos besoins
      return null;
    }
  }

  getWeekPeriod(): string {
    const start = startOfWeek(this.viewDate, {
      weekStartsOn: this.weekStartsOn,
    });
    const end = endOfWeek(this.viewDate, { weekStartsOn: this.weekStartsOn });

    // Obtenir le mois et l'année de la date de début
    const startMonth = format(start, 'MMMM', { locale: fr }); // 'fr' est la locale française, assurez-vous d'utiliser la locale appropriée
    const startYear = format(start, 'yyyy');

    // Vérifier si la semaine commence et se termine dans le même mois
    if (start.getMonth() === end.getMonth()) {
      return `Semaine du ${start.getDate()} ${startMonth} ${startYear}`;
    } else {
      // Si la semaine se termine dans un mois différent, affichez également la date de fin
      const endMonth = format(end, 'MMMM', { locale: fr });
      return `Semaine du ${start.getDate()} ${startMonth} - ${end.getDate()} ${endMonth} ${startYear}`;
    }
  }

  resetModal(): void {
    this.selectedCourse = null;
    this.changeDetectorRef.markForCheck(); // Trigger change detection manually
  }
  clearCopiedEvents(): void {
    this.copiedEvents = []; // Vide copiedEvents

    // Affichez un toast pour indiquer que copiedEvents a été vidé avec succès
    this.messageService.add({
      severity: 'success', // Utilisez 'success' pour un message de succès
      summary: 'Copie Vidée', // Titre du toast
      detail: 'La copie des cours a été vidée avec succès.', // Message détaillé
    });
  }
}
/*ENT Montreuil is a Desktop Working Environnement for the students of the IUT of Montreuil
    Copyright (C) 2024  Steven CHING, Emilio CYRIAQUE-SOURISSEAU ALVARO-SEMEDO, Ismail GADA, Yanis HAMANI, Priyank SOLANKI

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.*/