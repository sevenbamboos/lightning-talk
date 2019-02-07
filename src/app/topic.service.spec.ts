import { TopicService } from "./topic.service";
import { Topic } from './topic';

import { Observable, of } from 'rxjs';
import { defer } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

function asyncError<T>(error: T) {
  return defer(() => Promise.reject(error));
}

export class MockTopicService {

  nextID = 0;
  topic1 = new Topic('title-a', 'mock@email.com', 'mock topic');
  topic2 = new Topic('title-b', 'mock@email.com', 'mock topic');

  availableTopics: Topic[] = [];

  constructor() {
    this.topic1.id = ++this.nextID;
    this.availableTopics.push(this.topic1);

    this.topic2.id = ++this.nextID;
    this.availableTopics.push(this.topic2);
  }

  nextTalk(): Observable<Object> {
    return of('07/Feb/2019');
  }

  getAvailableTopics(): Observable<Topic[]> {
    return of(this.availableTopics);
  }

  createTopic(topic: Topic): Observable<Topic> {
    topic.id = ++this.nextID;
    this.availableTopics.push(topic);
    return of(topic);
  } 

  deleteTopic(id: number): Observable<Object> {
    const found = this.availableTopics.findIndex(t => t.id === id);
    if (found == -1) return of('not found');
    else {
      const deleted = this.availableTopics[found];
      this.availableTopics.splice(found, 1);
      return of(deleted);
    }
  }  
}

describe('TopicService', () => {
  let service: TopicService;
  let httpClientSpy: { get: jasmine.Spy };

  beforeEach(() => { 
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new TopicService(<any> httpClientSpy); 
  });

  it('should return available topics (HttpClient called once)', () => {
    const expectedTopics: Topic[] = [
      new Topic('title-a', 'mock@email.com', 'mock topic'),
      new Topic('title-b', 'mock@email.com', 'mock topic'),
    ];
 
    httpClientSpy.get.and.returnValue(asyncData(expectedTopics));
 
    service.getAvailableTopics().subscribe(topics => 
      expect(topics).toEqual(expectedTopics, 'expected topics'),
      fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should load a certain topic (HttpClient called once)', () => {
    const expectedTopic = new Topic('title-a', 'mock@email.com', 'mock topic');
    httpClientSpy.get.and.returnValue(asyncData(expectedTopic));
 
    service.loadTopic(1).subscribe(topic => 
      expect(topic).toEqual(expectedTopic, 'expected topic'),
      fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  // it('should return an error when the server returns a 404', () => {
  //   const errorResponse = new HttpErrorResponse({
  //     error: 'test 404 error',
  //     status: 404, statusText: 'Not Found'
  //   });
  //   httpClientSpy.get.and.returnValue(asyncError(errorResponse));
 
  //   service.loadTopic(1).subscribe(
  //     error => expect((<any>error).message).toContain('404')
  //   );
  // });

});