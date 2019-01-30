export class Topic {
  id: number;
  created_at: Date;
  talk_time: Date;

  constructor(
    public title: string, 
    public email: string, 
    public description: string) {
  }
}