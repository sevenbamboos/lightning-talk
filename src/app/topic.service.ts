import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Topic } from './topic';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  constructor(private http: HttpClient) { }

  nextTalk(): Observable<Object> {
    return this.http.get<Object>('http://localhost:3000/topics_next_talk').pipe(
      tap(_ => console.log('next talk')),
      catchError(this.handleError<Object>('nextTalk'))
    );
  }

  getAvailableTopics(): Observable<Topic[]> {
    return this.http.get<Topic[]>('http://localhost:3000/topics_available');
  }

  getAllTopics(): Observable<Topic[]> {
    return this.http.get<Topic[]>('http://localhost:3000/topics');
  }

  createTopic(topic: Topic): Observable<Topic> {
    return this.http.post<Topic>('http://localhost:3000/topics', topic, httpOptions).pipe(
      tap((topic: Topic) => console.log(`added topic w/ id=${topic.id}`)),
      catchError(this.handleError<Topic>('createTopic'))
    );
  }

  updateTopic(topic: Topic): Observable<Topic> {
    return this.http.put<Topic>(`http://localhost:3000/topics/${topic.id}`, topic, httpOptions).pipe(
      tap((topic: Topic) => console.log(`updated topic w/ id=${topic.id}`)),
      catchError(this.handleError<Topic>('updateTopic'))
    );
  }
  
  loadTopic(id: number): Observable<Topic> {
    return this.http.get<Topic>(`http://localhost:3000/topics/${id}`).pipe(
      tap(_ => console.log(`fetched topic id=${id}`)),
      catchError(this.handleError<Topic>(`loadTopic id=${id}`))
    );
  }

  deleteTopic(id: number): Observable<Object> {
    return this.http.delete<Object>(`http://localhost:3000/topics/${id}`).pipe(
      tap(_ => console.log(`deleted topic id=${id}`)),
      catchError(this.handleError<Object>(`deleteTopic id=${id}`))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }  

}
