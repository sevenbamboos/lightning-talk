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

  constructor(private topicService: TopicService) { }

  ngOnInit() {
    this.loadTopics();
  }

  loadTopics() {
    this.topicService.getTopics().subscribe( topics =>
      this.topics = topics
    );
  }

  onSelect(topic: Topic) {
    console.log('Selecting topic:', topic.title);
    this.selectedTopic = topic;
  }

}
