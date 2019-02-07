import { TestBed } from "@angular/core/testing";
import { TopicEditComponent } from "./topic-edit.component";
import { TopicService } from "../topic.service";
import { MockTopicService } from "../topic.service.spec";
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

class MockActivatedRoute {
  get snapshot() {
    return {
      paramMap: {
        get: function(key:string) {
          return 0;
        }
      }
    }
  }
}

class MockLocation {
  back() {}
}

describe('TopicEditComponent', () => {
  let comp: TopicEditComponent;
  let topicService: TopicService;

  beforeEach(() => { 
    TestBed.configureTestingModule({
      // provide the component-under-test and dependent service
      providers: [
        TopicEditComponent,
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: Location, useClass: MockLocation },
        { provide: TopicService, useClass: MockTopicService }
      ]
    });
    comp = TestBed.get(TopicEditComponent);
    topicService = TestBed.get(TopicService);
  });  

  it('has default value after init', () => {
    // before init
    expect(comp.topic).toBeUndefined();
    expect(comp.id).toBeUndefined();
    
    comp.ngOnInit();
    expect(comp.id).toBeNull();
    expect(comp.topic.title).toEqual('New Topic');
  });

  it('can create new topics', () => {
    comp.ngOnInit();
    const newTopic = comp.topic;
    newTopic.title = 'I create a new topic at 7 Feb 2019';
    comp.onSubmit();
    topicService.getAvailableTopics().subscribe(topics => {
      expect(
        topics.findIndex(t => t.title === 'I create a new topic at 7 Feb 2019')
      ).not.toBe(-1);
    });
  });
})