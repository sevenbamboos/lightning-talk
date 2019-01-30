export class Topic {
  // id: number;
  // title: string;
  // description: string;
  created_at: Date;
  talk_time: Date;

  constructor(public id: number, public title: string, public email: string, public description: string) {
  }
}