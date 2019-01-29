import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Topic } from './topic';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  constructor(private http: HttpClient) { }

  getTopics(): Observable<Topic[]> {
    return this.http.get<Topic[]>('http://localhost:3000/topics');
    // return of(this.mockData());    
  }

  loadTopic(id: number): Observable<Topic> {
    const topic = this.mockData().find(x => x.id === id);
    return of(topic);
  }

  private mockData() {
    return [
      new Topic(1, 'first topic', 'dummy@unknown.com', 'dummy topic'),
      new Topic(2, 'second topic', 'dummy@unknown.com', 'dummy topic'),
      new Topic(3, 'third topic', 'dummy@unknown.com', 'dummy topic'),
      new Topic(4, 'forth topic', 'dummy@unknown.com', 'dummy topic'),
    ];
  }

}
