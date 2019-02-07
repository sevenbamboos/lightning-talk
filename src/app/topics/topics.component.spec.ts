import { TestBed } from "@angular/core/testing";
import { Topic } from '../topic';
import { TopicsComponent } from "./topics.component";
import { TopicService } from "../topic.service";
import { MockTopicService } from "../topic.service.spec";

describe('TopicsComponent', () => {
  let comp: TopicsComponent

  beforeEach(() => { 
    TestBed.configureTestingModule({
      // provide the component-under-test and dependent service
      providers: [
        TopicsComponent,
        { provide: TopicService, useClass: MockTopicService }
      ]
    });
    comp = TestBed.get(TopicsComponent);

  });  

  it('has default value after init', () => {
    // before init
    expect(comp.topics).toBeUndefined();
    expect(comp.nextTalk).toBeUndefined();
    expect(comp.showAvailable).toBeTruthy();
    
    comp.ngOnInit();
    expect(comp.topics.length).toBe(2);
    expect(comp.nextTalk).toEqual('07/Feb/2019');
  });

  it('can select a topic', () => {
    comp.ngOnInit();
    expect(comp.topics.length).toBe(2);
    const topics: Topic[] = comp.topics;
    comp.onSelect(topics[0]);
    expect(comp.selectedTopic.title).toEqual(topics[0].title);
  });

  it('can delete a topic', () => {
    comp.ngOnInit();
    expect(comp.topics.length).toBe(2);
    const topics: Topic[] = comp.topics;

    comp.deleteTopic(topics[0].id);
    expect(comp.topics.length).toBe(1);
  });  
})