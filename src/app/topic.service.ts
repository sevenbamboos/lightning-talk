import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Topic } from './topic';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

export class TopicService {

  constructor(private http: HttpClient) { }

  getTopics(): Observable<Topic[]> {
    return this.http.get<Topic[]>('http://localhost:3000/topics');
    // return of(this.mockData());    
  }

  createTopic(topic: Topic): Observable<Topic> {
    return this.http.post<Topic>('http://localhost:3000/topics', topic, httpOptions).pipe(
      tap((topic: Topic) => console.log(`added topic w/ id=${topic.id}`)),
      catchError(this.handleError<Topic>('createTopic'))
    );
  }

  loadTopic(id: number): Observable<Topic> {
    return this.http.get<Topic>(`http://localhost:3000/topics/${id}`).pipe(
      tap(_ => console.log(`fetched topic id=${id}`)),
      catchError(this.handleError<Topic>(`loadTopic id=${id}`))
    );
    // const topic = this.mockData().find(x => x.id === id);
    // return of(topic);
  }

  private mockData() {
    return [
      new Topic(1, 'first topic', 'dummy@unknown.com', 'dummy topic'),
      new Topic(2, 'second topic', 'dummy@unknown.com', 'dummy topic'),
      new Topic(3, 'third topic', 'dummy@unknown.com', 'dummy topic'),
      new Topic(4, 'forth topic', 'dummy@unknown.com', 'dummy topic'),
    ];
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }  

}
