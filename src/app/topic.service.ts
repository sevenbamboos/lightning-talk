import { Injectable } from '@angular/core';
import { Topic } from './topic';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  constructor() { }

  getTopics(): Observable<Topic[]> {
    return of(this.mockData());    
  }

  loadTopic(id: number): Observable<Topic> {
    const topic = this.mockData().find(x => x.id === id);
    return of(topic);
  }

  private mockData() {
    return [
      new Topic(1, 'first topic', 'dummy topic'),
      new Topic(2, 'second topic', 'dummy topic'),
      new Topic(3, 'third topic', 'dummy topic'),
      new Topic(4, 'forth topic', 'dummy topic'),
    ];
  }

}
