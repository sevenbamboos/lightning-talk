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
  showAvailable: boolean;

  constructor(private topicService: TopicService) { 
    this.showAvailable = true;
  }

  ngOnInit() {
    this.loadTopics();
    this.getNextTalk();
  }

  getNextTalk() {
    this.topicService.nextTalk().subscribe( msg =>
      this.nextTalk = msg
    );
  }

  toggleLoad() {
    this.showAvailable = !this.showAvailable;
    this.loadTopics();
  }

  loadTopics() {
    if (this.showAvailable) {
      this.loadAvailableTopics();
    } else {
      this.loadAllTopics();
    }
  }

  private loadAvailableTopics() {
    this.topicService.getAvailableTopics().subscribe( topics =>
      this.topics = topics
    );
  }

  private loadAllTopics() {
    this.topicService.getAllTopics().subscribe( topics =>
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
