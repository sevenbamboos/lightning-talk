import { Component, OnInit } from '@angular/core';
import { Topic } from '../topic';
import { TopicService } from '../topic.service';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit {

  topics: Topic[];
  selectedTopic: Topic;
  nextTalk;

  constructor(private topicService: TopicService) { }

  ngOnInit() {
    this.loadTopics();
    this.getNextTalk();
  }

  getNextTalk() {
    this.topicService.nextTalk().subscribe( msg =>
      this.nextTalk = msg
    );
  }

  loadTopics() {
    this.topicService.getTopics().subscribe( topics =>
      this.topics = topics
    );
  }

  deleteTopic = (id: number) => {
    this.topicService.deleteTopic(id).subscribe( msg => {
      this.loadTopics();
    });
  }

  onSelect(topic: Topic) {
    this.selectedTopic = topic;
  }

}
