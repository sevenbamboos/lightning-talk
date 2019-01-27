import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TopicsComponent } from './topics/topics.component';
import { TopicEditComponent } from './topic-edit/topic-edit.component';

const routes: Routes = [
  {path: 'topics', component: TopicsComponent},
  {path: 'topic-edit', component: TopicEditComponent},
  {path: 'topic-edit/:id', component: TopicEditComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
