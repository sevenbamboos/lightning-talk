import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { TopicService } from '../topic.service';
import { Topic } from '../topic';

@Component({
  selector: 'app-topic-edit',
  templateUrl: './topic-edit.component.html',
  styleUrls: ['./topic-edit.component.css']
})
export class TopicEditComponent implements OnInit {

  id: number;
  topic: Topic;

  constructor(
    private router: ActivatedRoute,
    private topicService: TopicService,
    private location: Location
  ) { }

  ngOnInit() {
    const idParam = +this.router.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = idParam;
      this.loadTopic(this.id);
    } else {
      this.id = null;
      this.topic = new Topic('New Topic', '...', '');
    }
  }

  goBack(): void {
    this.location.back();
  }

  loadTopic(id: number) {
    this.topicService.loadTopic(id).subscribe(x => {this.topic = x; console.log(this.topic);});
  }

  onSubmit() {
    if (!this.id) {
      this.topicService.createTopic(this.topic).subscribe(() => this.goBack());
    }
  }

}
