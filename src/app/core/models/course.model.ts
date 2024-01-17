export class Course {
  id: number;
  startTime: string;
  endTime: string;
  dateCourse: string;
  control: boolean;
  resource: {
    id: number;
    name: string;
    color: string;
  };
  td: number[];
  training: number[];
  tp: number[];
  promotion: number[];
  teacher: {
    id: number;
    first_name: string;
    last_name: string;
    initial: string;
    username: string;
  }[];
  classroom: {
    id: number;
    name: string;
    capacity: number;
  }[];

  constructor(data: any) {
    this.id = data.id;
    this.startTime = data.startTime;
    this.endTime = data.endTime;
    this.dateCourse = data.dateCourse;
    this.control = data.control;
    this.resource = {
      id: data.resource.id,
      name: data.resource.name,
      color: data.resource.color,
    };
    this.td = data.td;
    this.tp = data.tp;
    this.promotion = data.promotion;
    this.teacher = data.teacher;
    this.classroom = data.classroom;
    this.training = data.training;
  }
}
