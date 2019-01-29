export class Topic {
  // id: number;
  // title: string;
  // description: string;
  submissionDate: Date;
  talkDate: Date;

  constructor(public id: number, public title: string, public email: string, public description: string) {
  }
}